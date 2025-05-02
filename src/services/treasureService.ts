import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { ITreasure, ScoreTreasure } from "../types/treasure";
import { IUser } from "../types/user";

/**
 * 보물 id(랜덤/암호화된 번호)로 보물 정보 가져오기
 */
export const getTreasureById = async (
  id: number
): Promise<ITreasure | null> => {
  const treasureRef = doc(db, "treasures", id.toString());
  const snapshot = await getDoc(treasureRef);
  return snapshot.exists() ? ({ id, ...snapshot.data() } as ITreasure) : null;
};

/**
 * 보물 찾기 처리
 * - 보물 상태(발견 여부, 발견자, 시간) 업데이트
 * - 유저 상태(점수, 찾은 보물 목록) 업데이트
 */
export const findTreasure = async (
  treasureId: number,
  user: IUser
): Promise<ITreasure | null> => {
  const treasure = await getTreasureById(treasureId);
  if (!treasure || treasure.isFind) return treasure;

  const treasureRef = doc(db, "treasures", treasureId.toString());
  const userRef = doc(db, "users", user.id);

  // 1. 보물 상태 업데이트
  await updateDoc(treasureRef, {
    isFind: true,
    finderName: user.username,
    timestamp: new Date(),
  });

  // 2. 유저 상태 업데이트
  const updates: any = { foundTreasures: arrayUnion(treasureId) };
  if (treasure.type === "SCORE")
    updates.score = increment((treasure as ScoreTreasure).points);

  await updateDoc(userRef, updates);

  // 3. 변경된 보물 정보 반환
  return { ...treasure, ...updates };
};
