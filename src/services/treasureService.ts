import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { ITreasure, ScoreTreasure } from "../types/treasure";
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
 * 보물 찾기 처리
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
  // 1. 보물 정보 조회
  const treasure = await getTreasureById(treasureDocId);

  // 2. 이미 찾은 보물이거나 없으면 그대로 반환
  if (!treasure || treasure.isFind) return treasure;

  // 3. Firestore 문서 참조
  const treasureRef = doc(db, "treasures", treasureDocId);
  const userRef = doc(db, "users", user.id);

  // 4. 보물 상태 업데이트 (isFind, finderName, timestamp)
  const treasureUpdates = {
    isFind: true,
    finderName: user.username,
    timestamp: new Date(),
  };
  await updateDoc(treasureRef, treasureUpdates);

  // 5. 유저 상태 업데이트 (findTreasures, score)
  const userUpdates: any = {
    findTreasures: arrayUnion(treasureDocId), // 찾은 보물 문서 ID 추가 (string)
  };

  let scoreToAdd = 0;
  if (treasure.type === "SCORE") {
    scoreToAdd = (treasure as ScoreTreasure).score;
    userUpdates.score = increment(scoreToAdd);
  }
  await updateDoc(userRef, userUpdates);

  // 6. 팀 점수 업데이트 (teams 컬렉션)
  if (treasure.type === "SCORE" && scoreToAdd > 0) {
    try {
      // 사용자의 팀 ID로 teams 컬렉션에서 해당 팀 문서 찾기
      const teamsQuery = query(
        collection(db, "teams"),
        where("teamId", "==", user.team)
      );
      const teamsSnapshot = await getDocs(teamsQuery);

      if (!teamsSnapshot.empty) {
        // 팀 문서가 있으면 totalScore 업데이트
        const teamDoc = teamsSnapshot.docs[0];
        const teamRef = doc(db, "teams", teamDoc.id);
        await updateDoc(teamRef, {
          totalScore: increment(scoreToAdd),
        });
        console.log(`팀 ${user.team}의 점수가 ${scoreToAdd}점 증가했습니다.`);
      } else {
        console.log(`팀 ${user.team}을 찾을 수 없습니다.`);
      }
    } catch (error) {
      console.error("팀 점수 업데이트 실패:", error);
    }
  }
  // 7. 변경된 보물 정보 반환 (UI 업데이트용)
  return {
    ...treasure,
    ...treasureUpdates,
  };
};
