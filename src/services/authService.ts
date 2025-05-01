import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
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
    createdAt: doc.data().createdAt.toDate(),
  } as IUser;
};
