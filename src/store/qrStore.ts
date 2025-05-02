// qrStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITreasure } from "../types/treasure";
import { getTreasureById, findTreasure } from "@services/treasureService";
import { IUser } from "../types/user";

/**
 * QR 관련 상태 관리 인터페이스
 * - 보물 ID, 보물 정보, 로딩 상태, 에러 상태 관리
 * - 보물 ID 설정, 보물 정보 조회, 보물 찾기, 데이터 초기화 기능 제공
 */
interface QRState {
  treasureId: string | null; // QR에서 스캔한 보물 ID 파베문서id라 스트링링
  treasure: ITreasure | null; // 조회된 보물 정보
  isLoading: boolean; // API 요청 중 로딩 상태
  error: string | null; // 에러 메시지
  setTreasureId: (id: string) => void; // 보물 ID 설정
  fetchTreasure: () => Promise<void>; // 보물 정보 조회
  findTreasure: (user: IUser) => Promise<void>; // 보물 찾기 처리
  clearQRData: () => void; // QR 데이터 초기화
}

/**
 * QR 관련 전역 상태관리 (단일 책임 원칙)
 * - QR 코드 스캔 후 보물 정보 관리 및 상태 업데이트
 * - 로컬 스토리지에 treasureId 유지 (페이지 새로고침 대응)
 */
export const useQRStore = create<QRState>()(
  persist(
    (set, get) => ({
      treasureId: null,
      treasure: null,
      isLoading: false,
      error: null,

      // QR에서 스캔한 보물 ID 설정
      setTreasureId: (id) => set({ treasureId: id }),

      // 보물 ID로 보물 정보 조회
      fetchTreasure: async () => {
        const { treasureId } = get();
        if (!treasureId) return;
        try {
          set({ isLoading: true, error: null });
          const treasure = await getTreasureById(treasureId);
          // 에러 처리 없이 바로 세팅 (보물 QR은 무조건 보물임)
          set({ treasure, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "보물 조회 실패",
            isLoading: false,
          });
        }
      },

      // 보물 찾기 처리 (Firestore 업데이트)
      findTreasure: async (user) => {
        const { treasureId } = get();
        if (!treasureId) return;
        try {
          set({ isLoading: true, error: null });
          const treasure = await findTreasure(treasureId, user);
          set({ treasure, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "보물 찾기 실패",
            isLoading: false,
          });
        }
      },
      // QR 데이터 초기화 (홈으로 이동 시 호출)
      clearQRData: () => set({ treasureId: null, treasure: null, error: null }),
    }),
    {
      name: "qr-storage",
      partialize: (state) => ({ treasureId: state.treasureId }),
    }
  )
);
