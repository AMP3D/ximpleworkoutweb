import { IExercise, IWorkout } from "../models";
import { convertToWorkoutSetId } from "./stringHelper";

export const getLastCompletedSet = (
  workout: IWorkout,
  exercise: IExercise,
  setIndex: number,
  lastCompletedSets: { [key: string]: string }
) => {
  const lastWorkoutSetId = convertToWorkoutSetId(
    workout.name,
    exercise?.name,
    setIndex
  );

  return lastCompletedSets[lastWorkoutSetId];
};
