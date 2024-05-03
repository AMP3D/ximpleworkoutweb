import { IWorkout } from "../models";
import workoutFile from "../../sample-workout.json";

export type ImportResults = { workouts: IWorkout[]; errors: string[] };

export const parseWorkouts = (workouts: IWorkout[]): ImportResults => {
  const workoutIds: Map<string, number> = new Map();
  const errors: string[] = [];

  workouts?.forEach((workout) => {
    const workoutId = workout.name?.toLocaleLowerCase() || "";
    let workoutIdCount = workoutIds.get(workoutId);

    if (workoutIdCount === undefined) {
      workoutIds.set(workoutId, 0);
    } else {
      workoutIds.set(workoutId, workoutIdCount++);
      errors.push(
        `Workout with name "${workoutId}" has duplicates. Workout names must be unique.`
      );
    }

    workout.exercises?.forEach((exercise) => {
      const exerciseIds: Map<string, number> = new Map();
      const exerciseId = exercise.name?.toLocaleLowerCase() || "";
      let exerciseIdCount = exerciseIds.get(exerciseId);

      if (exerciseIdCount === undefined) {
        exerciseIds.set(exerciseId, 0);
      } else {
        exerciseIds.set(exerciseId, exerciseIdCount++);
        errors.push(
          `Workout with name "${workoutId}" has duplicates for exercise with name "${exerciseId}". Exercise names must be unique within a workout.`
        );
      }
    });
  });

  return { workouts, errors } as ImportResults;
};

export const importSampleFile = (): ImportResults => {
  const workouts = workoutFile.workouts as IWorkout[];

  return parseWorkouts(workouts);
};

export function convertToBlob<T>(obj: T) {
  const str = JSON.stringify(obj, undefined, 2);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });

  return blob;
}
