import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AppStore = {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
};

const STORAGE_KEY = "ximple-workout-tracker-web-storage-app";
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
