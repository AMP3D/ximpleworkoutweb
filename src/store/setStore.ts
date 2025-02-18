import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ISet } from "../models";

export type SetStore = {
  completedSetIds: { [key: string]: boolean };
  lastCompletedSets: { [key: string]: string };
  sets: ISet[];
  setCompletedSetId: (setId: string, isCompleted: boolean) => void;
  updateLastCompleted: (setId: string) => void;
};

const STORAGE_KEY = "ximple-workout-tracker-web-storage-sets";
export const useSetStore = create<SetStore>()(
  persist(
    (set, get) => ({
      completedSetIds: {},
      lastCompletedSets: {},
      sets: [],
      addSet: (exerciseSet: ISet) =>
        set({ sets: [...get().sets, exerciseSet] }),
      setCompletedSetId: (setId: string, isCompleted: boolean) =>
        set((state) => {
          const newCompletedSetIds = { ...state.completedSetIds };

          if (isCompleted) {
            newCompletedSetIds[setId] = true;
          } else {
            delete newCompletedSetIds[setId];
          }

          return { completedSetIds: newCompletedSetIds };
        }),
      updateLastCompleted: (workoutSet: string) =>
        set((state) => ({
          lastCompletedSets: {
            ...state.lastCompletedSets,
            [workoutSet]: dayjs().format("MM/DD/YYYY HH:mm:ss"),
          },
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
