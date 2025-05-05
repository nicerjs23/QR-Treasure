// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuthStore } from "@store/authStore";
import { auth } from "../firebase";
import { signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";

// 인증 컨텍스트 정의
interface AuthContextType {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticating: true,
  isAuthenticated: false,
});

// 인증 프로바이더 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // 익명 인증 효과: Zustand 스토어에 유저가 있을 때만 Firebase Auth 로그인
  useEffect(() => {
    if (user && !auth.currentUser) {
      signInAnonymously(auth).catch((error) => {
        console.error("익명 인증 실패:", error);
      });
    }
  }, [user]);

  // Firebase Auth 상태 변경 감지: Auth가 로그아웃되면 Zustand 스토어도 로그아웃
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser && user) {
        // Firebase Auth가 로그아웃됐는데 스토어에 사용자가 있으면 스토어도 로그아웃
        logout();
      }
    });

    return () => unsubscribe();
  }, [user, logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating: false,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 인증 상태 사용을 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
