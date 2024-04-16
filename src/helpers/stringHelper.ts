export const convertToSetId = (workoutName: string, exerciseName: string, setIndex: number) => {
    const currentDate = new Date().toLocaleDateString();

    return `${workoutName}-${exerciseName}-${setIndex + 1}-${currentDate}`;
}