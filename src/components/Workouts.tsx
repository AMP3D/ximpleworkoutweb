import { FC, useState } from "react";
import Workout from "./Workout";
import Collapse from "./ui/Collapse";
import { useWorkoutStore } from "../store/workoutStore";
import AddButton from "./ui/AddButton";
import AddWorkout from "./AddWorkout";
import { IWorkout } from "../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./ui/Modal";

const Workouts: FC = () => {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [removeWorkoutName, setRemoveWorkoutName] = useState<string>("");
  const { addWorkout, removeWorkout, workouts } = useWorkoutStore();

  const onAddWorkout = (workoutName: string) => {
    setShowAddWorkout(false);

    addWorkout({
      name: workoutName,
      exercises: [],
    } as IWorkout);
  };

  const onRemoveWorkoutConfirm = () => {
    removeWorkout(removeWorkoutName);
    setRemoveWorkoutName("");
  };

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
              className="btn btn-secondary btn-sm text-accent"
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
        <AddWorkout
          onAdd={onAddWorkout}
          onCancel={() => setShowAddWorkout(false)}
        />
      )}

      {removeWorkoutName && (
        <Modal
          onModalConfirm={onRemoveWorkoutConfirm}
          onModalClose={() => setRemoveWorkoutName("")}
          title="Confirm"
        >
          <div>Are you sure you want to remove this workout? </div>
        </Modal>
      )}

      <AddButton
        onAddClick={() => setShowAddWorkout(true)}
        buttonText="Add Workout"
      />
    </>
  );
};

export default Workouts;