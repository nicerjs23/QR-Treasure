import { db } from "../firebase";
import {
  doc,
  getDoc,
  arrayUnion,
  increment,
  query,
  collection,
  where,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { ITreasure } from "../types/treasure";
import { IUser } from "../types/user";

/**
 * 보물 문서 ID(문자열)로 보물 정보 가져오기
 * @param docId Firestore treasures 컬렉션의 문서 ID (string)
 * @returns 보물 정보 객체 또는 null (존재하지 않는 경우)
 */
export const getTreasureById = async (
  docId: string
): Promise<ITreasure | null> => {
  const treasureRef = doc(db, "treasures", docId);
  const snapshot = await getDoc(treasureRef);
  // Firestore 문서 ID는 항상 string!
  return snapshot.exists() ? (snapshot.data() as ITreasure) : null;
};

/**
 * 보물 찾기 처리(트랜잭션 사용으로 중복 업데이트 방지)
 * - 보물 상태(발견 여부, 발견자, 시간) 업데이트
 * - 유저 상태(점수, 찾은 보물 목록) 업데이트
 * @param treasureDocId 보물 문서 ID (string)
 * @param user 현재 로그인한 사용자 정보
 * @returns 업데이트된 보물 정보 또는 null
 */
export const findTreasure = async (
  treasureDocId: string,
  user: IUser
): Promise<ITreasure | null> => {
  try {
    // 트랜잭션으로 모든 업데이트를 원자적으로 처리
    return await runTransaction(db, async (transaction) => {
      // 1. 보물 정보 조회
      const treasureRef = doc(db, "treasures", treasureDocId);
      const treasureDoc = await transaction.get(treasureRef);

      if (!treasureDoc.exists()) {
        console.log("보물이 존재하지 않습니다.");
        return null;
      }

      const treasure = treasureDoc.data() as ITreasure;

      // 2. 이미 찾은 보물이면 그대로 반환
      if (treasure.isFind) {
        console.log("이미 찾은 보물입니다.");
        return treasure;
      }

      // 3. 보물 상태 업데이트
      const treasureUpdates = {
        isFind: true,
        finderName: user.username,
        timestamp: new Date(),
      };

      transaction.update(treasureRef, treasureUpdates);

      // 4. 유저 상태 업데이트
      const userRef = doc(db, "users", user.id);
      let scoreToAdd = 0;

      if (treasure.type === "SCORE") {
        scoreToAdd = treasure.score;
        transaction.update(userRef, {
          findTreasures: arrayUnion(treasureDocId),
          score: increment(scoreToAdd),
        });
      } else {
        transaction.update(userRef, {
          findTreasures: arrayUnion(treasureDocId),
        });
      }

      // 5. 팀 점수 업데이트
      if (treasure.type === "SCORE" && scoreToAdd > 0) {
        // 팀 문서 찾기 (트랜잭션 외부에서 수행)
        const teamsQuery = query(
          collection(db, "teams"),
          where("teamId", "==", user.team)
        );
        const teamsSnapshot = await getDocs(teamsQuery);

        if (!teamsSnapshot.empty) {
          const teamDoc = teamsSnapshot.docs[0];
          const teamRef = doc(db, "teams", teamDoc.id);
          transaction.update(teamRef, {
            totalScore: increment(scoreToAdd),
          });
          console.log(`팀 ${user.team}의 점수가 ${scoreToAdd}점 증가했습니다.`);
        } else {
          console.log(`팀 ${user.team}을 찾을 수 없습니다.`);
        }
      }

      // 6. 업데이트된 보물 정보 반환
      return {
        ...treasure,
        ...treasureUpdates,
      };
    });
  } catch (error) {
    console.error("보물 찾기 트랜잭션 실패:", error);
    throw error;
  }
};
