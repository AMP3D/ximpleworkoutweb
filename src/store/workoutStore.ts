import { create } from "zustand";
import { IWorkout } from "../models";
import { createJSONStorage, persist } from "zustand/middleware";

type WorkoutStore = {
  workouts: IWorkout[];
  addWorkout: (workout: IWorkout) => void;
  removeWorkout: (workoutName: string) => void;
  clearWorkouts: () => void;
};

const STORAGE_KEY = "workit-workout-tracker-web-storage-workouts";
export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      workouts: [],
      addWorkout: (workout: IWorkout) =>
        set({ workouts: [...get().workouts, workout] }),
      removeWorkout: (workoutName: string) => {
        const formattedWorkoutName = workoutName?.trim()?.toLocaleLowerCase();
        if (!formattedWorkoutName) {
          return;
        }

        const workouts = get().workouts;
        const newWorkouts = workouts.filter(
          (workout) =>
            workout.name?.trim()?.toLocaleLowerCase() !== formattedWorkoutName
        );

        set({ workouts: newWorkouts });
      },
      clearWorkouts: () => set({ workouts: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
