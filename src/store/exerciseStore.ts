import { create } from "zustand";
import { IExercise } from "../models";
import { createJSONStorage, persist } from "zustand/middleware";

type ExerciseStore = {
  exercises: IExercise[];
  addExercise: (exercise: IExercise) => void;
  clearExercises: () => void;
};

const STORAGE_KEY = "ximple-workout-tracker-web-storage-exercises";
export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: [],
      addExercise: (exercise: IExercise) =>
        set({ exercises: [...get().exercises, exercise] }),
      clearExercises: () => set({ exercises: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
