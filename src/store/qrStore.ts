// qrStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITreasure } from "../types/treasure";
import { getTreasureById, findTreasure } from "@services/treasureService";
import { IUser } from "../types/user";

interface QRState {
  treasureId: number | null;
  treasure: ITreasure | null;
  isLoading: boolean;
  error: string | null;
  setTreasureId: (id: number) => void;
  fetchTreasure: () => Promise<void>;
  findTreasure: (user: IUser) => Promise<void>;
  clearQRData: () => void;
}

/**
 * QR 관련 전역 상태관리 (단일 책임 원칙)
 */
export const useQRStore = create<QRState>()(
  persist(
    (set, get) => ({
      treasureId: null,
      treasure: null,
      isLoading: false,
      error: null,

      setTreasureId: (id) => set({ treasureId: id }),

      fetchTreasure: async () => {
        const { treasureId } = get();
        if (!treasureId) return;
        try {
          set({ isLoading: true });
          const treasure = await getTreasureById(treasureId);
          set({ treasure, isLoading: false });
        } catch (err) {
          set({ error: "보물 조회 실패", isLoading: false });
        }
      },

      findTreasure: async (user) => {
        const { treasureId } = get();
        if (!treasureId) return;
        try {
          set({ isLoading: true });
          const treasure = await findTreasure(treasureId, user);
          set({ treasure, isLoading: false });
        } catch (err) {
          set({ error: "보물 찾기 실패", isLoading: false });
        }
      },

      clearQRData: () => set({ treasureId: null, treasure: null, error: null }),
    }),
    { name: "qr-storage" }
  )
);
