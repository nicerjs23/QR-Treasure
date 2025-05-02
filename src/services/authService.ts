import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { IUser } from "../types/user";
import { ITeam } from "../types/team";
/**
 * 팀 객체에 유저 추가
 * @param user 추가할 유저 정보
 */
const addUserToTeam = async (user: IUser): Promise<void> => {
  try {
    // 팀 ID로 팀 문서 찾기 (teamId 필드로 쿼리)
    const teamsQuery = query(
      collection(db, "teams"),
      where("teamId", "==", user.team)
    );
    const teamsSnapshot = await getDocs(teamsQuery);

    if (teamsSnapshot.empty) {
      console.log(`팀 ID ${user.team}에 해당하는 팀을 찾을 수 없습니다.`);
      return;
    }

    // 팀 문서 참조 가져오기
    const teamDoc = teamsSnapshot.docs[0];
    const teamRef = doc(db, "teams", teamDoc.id);
    const teamData = teamDoc.data() as ITeam;

    // 이미 해당 멤버가 포함되어 있는지 확인
    if (!teamData.members.includes(user.username)) {
      // 멤버가 없으면 추가
      await updateDoc(teamRef, {
        members: arrayUnion(user.username),
      });
      console.log(
        `유저 ${user.username}을(를) 팀 ${user.team}에 추가했습니다.`
      );
    } else {
      console.log(
        `유저 ${user.username}은(는) 이미 팀 ${user.team}에 있습니다.`
      );
    }
  } catch (error) {
    console.error("팀에 유저 추가 실패:", error);
  }
};

// Firestore에서 username으로 사용자 존재 확인
export const checkUserExists = async (
  username: string
): Promise<IUser | null> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  const user = {
    id: doc.id,
    ...doc.data(),
  } as IUser;

  // 사용자가 속한 팀에 멤버로 추가
  await addUserToTeam(user);

  return user;
};
// 사용자 ID로 최신 사용자 정보 가져오기
export const refreshUserData = async (
  userId: string
): Promise<IUser | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null;

    return {
      id: userId,
      ...userSnap.data(),
    } as IUser;
  } catch (error) {
    console.error("사용자 정보 새로고침 실패:", error);
    return null;
  }
};
