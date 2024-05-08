import { create } from "zustand";
import { IExercise, ISet, IWorkout } from "../models";
import { createJSONStorage, persist } from "zustand/middleware";
import { getTrimmedLowercase } from "../helpers/stringHelper";

type WorkoutStore = {
  workouts: IWorkout[];
  addExercise: (workoutName: string, exercise: IExercise) => void;
  addSet: (
    workoutName: string,
    exerciseName: string,
    exerciseSet: ISet
  ) => void;
  addWorkout: (workout: IWorkout) => void;
  removeExercise: (workoutName: string, exerciseName: string) => void;
  removeSet: (
    workoutName: string,
    exerciseName: string,
    setIndex: number
  ) => void;
  removeWorkout: (workoutName: string) => void;
  clearWorkouts: () => void;
};

const STORAGE_KEY = "ximple-workout-tracker-web-storage-workouts";
export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      workouts: [],
      // TODO: Need to move this to the exercise store at some point, this is not performant and very ugly!
      addExercise: (workoutName: string, exercise: IExercise) => {
        const workoutNameTrimmed = getTrimmedLowercase(workoutName);
        if (!workoutNameTrimmed) {
          return;
        }

        const workouts = get().workouts;
        workouts?.forEach((workout) => {
          if (workoutNameTrimmed === getTrimmedLowercase(workout.name)) {
            workout.exercises?.push(exercise);
          }
        });

        set({ workouts: workouts });
      },
      // TODO: Need to move this to the set store at some point, this is not performant and very ugly!
      addSet: (
        workoutName: string,
        exerciseName: string,
        exerciseSet: ISet
      ) => {
        const workoutNameTrimmed = getTrimmedLowercase(workoutName);
        if (!workoutNameTrimmed) {
          return;
        }

        const workouts = get().workouts;
        workouts?.forEach((workout) => {
          if (workoutNameTrimmed === getTrimmedLowercase(workout.name)) {
            const exerciseNameTrimmed = getTrimmedLowercase(exerciseName);
            if (!exerciseNameTrimmed) {
              return;
            }

            workout.exercises?.forEach((exercise) => {
              if (exerciseNameTrimmed === getTrimmedLowercase(exercise.name)) {
                exercise.sets.push(exerciseSet);
              }
            });
          }
        });

        set({ workouts: workouts });
      },
      addWorkout: (workout: IWorkout) =>
        set({ workouts: [...get().workouts, workout] }),
      removeExercise: (workoutName: string, exerciseName: string) => {
        const workoutNameTrimmed = getTrimmedLowercase(workoutName);
        if (!workoutNameTrimmed) {
          return;
        }

        const exerciseNameTrimmed = getTrimmedLowercase(exerciseName);
        if (!exerciseNameTrimmed) {
          return;
        }

        const workouts = get().workouts;
        workouts.forEach((workout) => {
          workout.exercises = workout.exercises.filter(
            (exercise) =>
              !(
                getTrimmedLowercase(workout.name) === workoutNameTrimmed &&
                getTrimmedLowercase(exercise.name) === exerciseNameTrimmed
              )
          );
        });

        set({ workouts: workouts });
      },
      removeSet: (
        workoutName: string,
        exerciseName: string,
        setIndex: number
      ) => {
        const workoutNameTrimmed = getTrimmedLowercase(workoutName);
        if (!workoutNameTrimmed) {
          return;
        }

        const exerciseNameTrimmed = getTrimmedLowercase(exerciseName);
        if (!exerciseNameTrimmed) {
          return;
        }

        const workouts = get().workouts;
        workouts.forEach((workout) => {
          workout.exercises.forEach((exercise) => {
            if (
              getTrimmedLowercase(workout.name) === workoutNameTrimmed &&
              getTrimmedLowercase(exercise.name) === exerciseNameTrimmed
            ) {
              exercise.sets.splice(setIndex, 1);
            }
          });
        });

        set({ workouts: workouts });
      },
      removeWorkout: (workoutName: string) => {
        const workoutNameTrimmed = getTrimmedLowercase(workoutName);
        if (!workoutNameTrimmed) {
          return;
        }

        const workouts = get().workouts;
        const newWorkouts = workouts.filter(
          (workout) => getTrimmedLowercase(workout.name) !== workoutNameTrimmed
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
