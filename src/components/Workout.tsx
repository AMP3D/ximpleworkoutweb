import { IWorkout } from "../models";
import { FC } from "react";
import Exercise from "./Exercise";
import Collapse from "./ui/Collapse";

export type WorkoutProps = {
  workout: IWorkout;
};

const Workout: FC<WorkoutProps> = (props) => {
  return props.workout.exercises.map((exercise, index) => (
    <Collapse
      classNames="bg-accent-content"
      key={`exercise-${index}`}
      primaryHeaderText="Exercise: "
      secondaryHeaderText={exercise.name}
    >
      <Exercise exercise={exercise} workoutName={props.workout.name} />
    </Collapse>
  ));
};

export default Workout;
