import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/user";
import {
  checkUserExists,
  refreshUserData,
  addUserToTeam,
} from "@services/authService";
import { auth } from "../firebase"; // 추가: Auth 임포트
import { signInAnonymously, signOut } from "firebase/auth"; // 추가: Firebase Auth 함수

// 인증 상태 타입 정의
interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>; // 사용자 정보 새로고침 액션 추가
  clearError: () => void;
  setError: (error: string | null) => void; // setError 추가
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (username: string) => {
        if (!username.trim()) {
          set({ error: "사용자 이름을 입력해 주세요." });
          return;
        }

        try {
          set({ isLoading: true, error: null });

          // 1단계: 먼저 사용자 데이터 확인 (아직 업데이트 없음)
          const userData = await checkUserExists(username);

          if (!userData) {
            set({ error: "** 존재하지 않는 사자입니다.", isLoading: false });
            return;
          }

          // 2단계: 익명 인증 수행
          try {
            await signInAnonymously(auth);

            // 3단계: 인증 성공 후 팀에 사용자 추가
            await addUserToTeam(userData);

            // 4단계: 상태 업데이트
            set({ user: userData, isLoading: false });
          } catch (authError) {
            console.error("인증 실패:", authError);
            set({
              error: "로그인 인증에 실패했습니다.",
              isLoading: false,
            });
          }
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "로그인 실패",
            isLoading: false,
          });
        }
      },

      // 로그아웃 액션: Firebase Auth도 함께 로그아웃
      logout: () => {
        signOut(auth).catch((err) => console.error("로그아웃 실패:", err));
        set({ user: null });
      },

      // 사용자 정보 새로고침 액션
      refreshUser: async () => {
        const { user } = get();
        if (!user) return;

        try {
          set({ isLoading: true });
          const refreshedUser = await refreshUserData(user.id);

          if (refreshedUser) {
            set({ user: refreshedUser, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (err) {
          set({ isLoading: false });
          console.error("사용자 정보 새로고침 실패:", err);
        }
      },

      // 에러 초기화
      clearError: () => set({ error: null }),

      // 에러 설정
      setError: (error: string | null) => set({ error }), // setError 구현
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // user만 저장
    }
  )
);
