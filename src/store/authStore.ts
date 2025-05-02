import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types/user";
import { checkUserExists, refreshUserData } from "@services/authService";

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

      // 로그인 액션: Firestore에서 사용자 확인
      login: async (username: string) => {
        if (!username.trim()) {
          set({ error: "사용자 이름을 입력해 주세요." }); // 에러 메시지 설정
          return;
        }

        try {
          set({ isLoading: true, error: null });
          const userData = await checkUserExists(username);

          if (!userData) {
            set({ error: "** 존재하지 않는 사자입니다.", isLoading: false });
            return;
          }

          set({ user: userData, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "로그인 실패",
            isLoading: false,
          });
        }
      },

      // 로그아웃 액션
      logout: () => set({ user: null }),

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
