import { create } from "zustand";
import { ISet } from "../models";
import { createJSONStorage, persist } from "zustand/middleware";

type SetStore = {
  completedSetIds: { [key: string]: boolean };
  sets: ISet[];
  setCompletedSetId: (setId: string, isCompleted: boolean) => void;
};

const STORAGE_KEY = "workit-workout-tracker-web-storage-sets";
export const useSetStore = create<SetStore>()(
  persist(
    (set, get) => ({
      completedSetIds: {},
      sets: [],
      addSet: (exerciseSet: ISet) =>
        set({ sets: [...get().sets, exerciseSet] }),
      setCompletedSetId: (setId: string, isCompleted: boolean) =>
        set((state) => {
          state.completedSetIds[setId] = isCompleted;

          return { completedSetIds: state.completedSetIds };
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
