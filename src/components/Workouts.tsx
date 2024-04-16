import { FC } from "react";
import Workout from "./Workout";
import Collapse from "./ui/Collapse";
import { useWorkoutStore } from "../store/workoutStore";

const Workouts: FC = () => {
  const workouts = useWorkoutStore((state) => state.workouts);

  return workouts.map((workout, index) => (
    <Collapse
      classNames="bg-primary-content"
      key={`workout-${index}`}
      primaryHeaderText="Workout: "
      secondaryHeaderText={workout.name}
    >
      <Workout workout={workout} />
    </Collapse>
  ));
};

export default Workouts;
