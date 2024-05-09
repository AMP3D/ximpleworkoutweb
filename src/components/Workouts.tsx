import { FC, useState } from "react";
import Workout from "./Workout";
import Collapse from "./ui/Collapse";
import { useWorkoutStore } from "../store/workoutStore";
import AddButton from "./ui/AddButton";
import AddWorkout from "./AddWorkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import RemoveWorkout from "./RemoveWorkout";

const Workouts: FC = () => {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [removeWorkoutName, setRemoveWorkoutName] = useState<string>();
  const { workouts } = useWorkoutStore();

  const onRemoveWorkout = (workoutName: string) => {
    setRemoveWorkoutName(workoutName);
  };

  const workoutsElements = workouts.map((workout, index) => (
    <Collapse
      classNames="bg-primary"
      key={`workout-${index}`}
      primaryHeaderText={
        <>
          <span className="mr-3 z-10 relative">
            <button
              aria-label="Remove Workout"
              className="btn btn-secondary btn-sm text-white"
              onClick={() => onRemoveWorkout(workout.name)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </span>

          <span>Workout: </span>
        </>
      }
      secondaryHeaderText={workout.name}
    >
      <Workout workout={workout} />
    </Collapse>
  ));

  return (
    <>
      {workoutsElements}

      {showAddWorkout && (
        <AddWorkout onClose={() => setShowAddWorkout(false)} />
      )}

      {removeWorkoutName && (
        <RemoveWorkout
          onClose={() => setRemoveWorkoutName(undefined)}
          workoutName={removeWorkoutName}
        />
      )}

      <AddButton
        onAddClick={() => setShowAddWorkout(true)}
        buttonText="Add Workout"
      />
    </>
  );
};

export default Workouts;
