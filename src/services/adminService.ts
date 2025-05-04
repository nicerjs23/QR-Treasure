// src/services/adminService.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ITreasure } from "../types/treasure";
import { IUser } from "../types/user";
import { ITeam } from "../types/team";

// 운영진 확인 (파이어스토어의 isAdmin 필드 기반)
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.isAdmin === true;
    }
    return false;
  } catch (error) {
    console.error("관리자 권한 확인 실패:", error);
    return false;
  }
};

// 팀 생성
export const createTeam = async (teamData: ITeam): Promise<boolean> => {
  try {
    // 이미 존재하는지 확인
    const existingQuery = query(
      collection(db, "teams"),
      where("teamId", "==", teamData.teamId)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      console.log(`이미 존재하는 팀 ID: ${teamData.teamId}`);
      return false;
    }

    // 새 팀 추가
    await addDoc(collection(db, "teams"), teamData);
    return true;
  } catch (error) {
    console.error("팀 생성 실패:", error);
    return false;
  }
};

// 유저 생성
export const createUser = async (
  userData: Omit<IUser, "id">
): Promise<boolean> => {
  try {
    // 이미 존재하는지 확인
    const existingQuery = query(
      collection(db, "users"),
      where("username", "==", userData.username)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      console.log(`이미 존재하는 사용자: ${userData.username}`);
      return false;
    }

    // 새 사용자 추가
    await addDoc(collection(db, "users"), userData);
    return true;
  } catch (error) {
    console.error("사용자 생성 실패:", error);
    return false;
  }
};

// 보물 생성
export const createTreasure = async (
  treasureData: ITreasure
): Promise<boolean> => {
  try {
    // treasureKey 중복 확인
    const existingQuery = query(
      collection(db, "treasures"),
      where("treasureKey", "==", treasureData.treasureKey)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      console.log(`이미 존재하는 보물 번호: ${treasureData.treasureKey}`);
      return false;
    }

    // customId가 있는 경우 문서 ID를 지정하여 생성
    if (treasureData.customId) {
      // 지정된 ID로 문서가 이미 존재하는지 확인
      const existingDoc = await getDoc(
        doc(db, "treasures", treasureData.customId)
      );
      if (existingDoc.exists()) {
        console.log(`이미 존재하는 문서 ID: ${treasureData.customId}`);
        return false;
      }

      // customId를 제외한 데이터 객체 생성 (Firestore에 저장되지 않도록)
      const { customId, ...dataToSave } = treasureData;

      // 지정된 ID로 문서 생성
      await setDoc(doc(db, "treasures", customId), dataToSave);
      console.log(`보물 생성 완료 (문서 ID: ${customId})`);
    } else {
      // customId가 없는 경우 자동 ID 생성
      await addDoc(collection(db, "treasures"), treasureData);
    }

    return true;
  } catch (error) {
    console.error("보물 생성 실패:", error);
    return false;
  }
};

// 여러 팀 한번에 생성
export const createTeams = async (teams: ITeam[]): Promise<number> => {
  let successCount = 0;

  for (const team of teams) {
    const result = await createTeam(team);
    if (result) successCount++;
  }

  return successCount;
};

// 여러 사용자 한번에 생성
export const createUsers = async (
  users: Omit<IUser, "id">[]
): Promise<number> => {
  let successCount = 0;

  for (const user of users) {
    const result = await createUser(user);
    if (result) successCount++;
  }

  return successCount;
};

// 여러 보물 한번에 생성
export const createTreasures = async (
  treasures: ITreasure[]
): Promise<number> => {
  let successCount = 0;

  for (const treasure of treasures) {
    const result = await createTreasure(treasure);
    if (result) successCount++;
  }

  return successCount;
};
