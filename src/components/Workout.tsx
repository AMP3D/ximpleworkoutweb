import { IWorkout } from "../models";
import { FC } from "react";
import Exercise from "./Exercise";
import Collapse from "./ui/Collapse";

export type WorkoutProps = {
  workout: IWorkout;
};

const Workout: FC<WorkoutProps> = (props) => {
  const { workout } = props;

  return workout.exercises.map((exercise, index) => (
    <Collapse
      classNames="bg-accent-content"
      key={`exercise-${index}`}
      primaryHeaderText="Exercise: "
      secondaryHeaderText={exercise.name}
    >
      <Exercise exercise={exercise} workoutName={workout.name} />
    </Collapse>
  ));
};

export default Workout;
