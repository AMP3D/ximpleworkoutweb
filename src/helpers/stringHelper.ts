export const convertToSetId = (
  workoutName: string,
  exerciseName: string,
  setIndex: number
) => {
  const currentDate = new Date().toLocaleDateString();

  return `${workoutName}-${exerciseName}-${setIndex + 1}-${currentDate}`;
};

export const convertToWorkoutSetId = (
  workoutName: string,
  exerciseName: string,
  setIndex: number
) => {
  return `${workoutName}-${exerciseName}-${setIndex + 1}`;
};

export const getTrimmedLowercase = (text: string) =>
  text?.trim()?.toLocaleLowerCase();
