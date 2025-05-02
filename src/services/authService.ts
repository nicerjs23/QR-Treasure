import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { IUser } from "../types/user";

// Firestore에서 username으로 사용자 존재 확인
export const checkUserExists = async (
  username: string
): Promise<IUser | null> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
    // createdAt: doc.data().createdAt.toDate(),
  } as IUser;
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
