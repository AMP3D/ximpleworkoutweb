import { FC, useState } from "react";
import Workout from "./Workout";
import Collapse from "./ui/Collapse";
import { useWorkoutStore } from "../store/workoutStore";
import AddEditButton from "./ui/AddEditButton";
import AddWorkout from "./AddWorkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import RemoveWorkout from "./RemoveWorkout";
import { MoveDirection } from "../models/Move";

const Workouts: FC = () => {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [removeWorkoutName, setRemoveWorkoutName] = useState<string>();
  const { moveWorkout, workouts } = useWorkoutStore();

  const onMoveWorkout = (workoutIndex: number, direction: MoveDirection) => {
    moveWorkout(workoutIndex, direction);
  };

  const onRemoveWorkout = (workoutName: string) => {
    setRemoveWorkoutName(workoutName);
  };

  const headerBtnClasses = "btn btn-secondary btn-sm text-white z-10 relative";

  const workoutsElements = workouts.map((workout, index) => (
    <Collapse
      classNames="bg-primary"
      key={`workout-${index}`}
      primaryHeaderText={<span>Workout: </span>}
      secondaryHeaderText={workout.name}
      headerButtonsRow={
        <div className="grid grid-cols-7">
          <div className="">
            <button
              aria-label="Remove Workout"
              className={`${headerBtnClasses}`}
              onClick={() => onRemoveWorkout(workout.name)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className="">
            <button
              aria-label="Move Workout Upwards"
              className={`${headerBtnClasses}`}
              onClick={() => onMoveWorkout(index, "up")}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
          <div className="">
            <button
              aria-label="Move Workout Downwards"
              className={`${headerBtnClasses}`}
              onClick={() => onMoveWorkout(index, "down")}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>
      }
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

      <AddEditButton
        onAddEditClick={() => setShowAddWorkout(true)}
        buttonText="Add Workout"
        isEdit={false}
      />
    </>
  );
};

export default Workouts;
