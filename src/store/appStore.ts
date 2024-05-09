import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AppStore = {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setUseMobileWidth: (useMobileWidth: boolean) => void;
  useMobileWidth: boolean;
};

const STORAGE_KEY = "ximple-workout-tracker-web-storage-app";
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      useMobileWidth: false,
      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
      setUseMobileWidth: (useMobileWidth: boolean) => set({ useMobileWidth }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
