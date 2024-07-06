import { create } from "zustand";
import { IExercise, ISet, IWorkout } from "../models";
import { createJSONStorage, persist } from "zustand/middleware";
import { getTrimmedLowercase } from "../helpers/stringHelper";
import { moveArrayItem } from "../helpers/arrayHelper";
import { MoveDirection } from "../models/Move";

type WorkoutStore = {
  workouts: IWorkout[];
  addExercise: (workoutName: string, exercise: IExercise) => void;
  addEditSet: (
    workoutName: string,
    exerciseName: string,
    exerciseSet: ISet,
    editSetIndex?: number
  ) => void;
  addWorkout: (workout: IWorkout) => void;
  copySet: (
    workoutName: string,
    exerciseName: string,
    setIndex: number
  ) => void;
  moveExercise: (
    workoutName: string,
    exerciseIndex: number,
    direction: MoveDirection
  ) => void;
  moveSet: (
    workoutName: string,
    exerciseName: string,
    setIndex: number,
    direction: MoveDirection
  ) => void;
  moveWorkout: (workoutIndex: number, direction: MoveDirection) => void;
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
      addEditSet: (
        workoutName: string,
        exerciseName: string,
        exerciseSet: ISet,
        editSetIndex?: number
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
                if (editSetIndex !== undefined) {
                  exercise.sets[editSetIndex] = exerciseSet;
                } else {
                  exercise.sets.push(exerciseSet);
                }
              }
            });
          }
        });

        set({ workouts: workouts });
      },
      addWorkout: (workout: IWorkout) =>
        set({ workouts: [...get().workouts, workout] }),
      copySet: (
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
              const set = exercise.sets[setIndex];
              if (set) {
                exercise.sets.push(set);
                exercise.sets = moveArrayItem(
                  exercise.sets,
                  exercise.sets.length - 1,
                  setIndex + 1
                );
              }
            }
          });
        });

        set({ workouts: workouts });
      },
      moveExercise: (
        workoutName: string,
        exerciseIndex: number,
        direction: MoveDirection
      ) => {
        const workoutNameTrimmed = getTrimmedLowercase(workoutName);
        if (!workoutNameTrimmed) {
          return;
        }
        const workouts = get().workouts;
        workouts.forEach((workout) => {
          if (direction === "up" && exerciseIndex >= 1) {
            workout.exercises = moveArrayItem(
              workout.exercises,
              exerciseIndex,
              exerciseIndex - 1
            );
          } else if (
            direction === "down" &&
            exerciseIndex < (workout?.exercises?.length || 0) - 1
          ) {
            workout.exercises = moveArrayItem(
              workout.exercises,
              exerciseIndex,
              exerciseIndex + 1
            );
          }
        });

        set({ workouts: workouts });
      },
      moveSet: (
        workoutName: string,
        exerciseName: string,
        setIndex: number,
        direction: MoveDirection
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
                // Can't move up past index zero and can't move down past array last array item
                if (direction === "up" && setIndex >= 1) {
                  exercise.sets = moveArrayItem(
                    exercise.sets,
                    setIndex,
                    setIndex - 1
                  );
                } else if (
                  direction === "down" &&
                  setIndex < (exercise.sets?.length || 0) - 1
                ) {
                  exercise.sets = moveArrayItem(
                    exercise.sets,
                    setIndex,
                    setIndex + 1
                  );
                }
              }
            });
          }
        });

        set({ workouts: workouts });
      },
      moveWorkout: (workoutIndex: number, direction: MoveDirection) => {
        const workouts = get().workouts;
        let newWorkouts = workouts;

        if (workouts?.length) {
          if (direction === "up" && workoutIndex >= 1) {
            newWorkouts = moveArrayItem(
              workouts,
              workoutIndex,
              workoutIndex - 1
            );
          } else if (
            direction === "down" &&
            workoutIndex < workouts.length - 1
          ) {
            newWorkouts = moveArrayItem(
              workouts,
              workoutIndex,
              workoutIndex + 1
            );
          }
        }

        set({ workouts: newWorkouts });
      },
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
