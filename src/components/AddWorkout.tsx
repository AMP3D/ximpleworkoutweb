import { FC, useState } from "react";
import Modal from "./ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useWorkoutStore } from "../store/workoutStore";
import { IWorkout } from "../models";

export type AddWorkoutProps = {
  onClose: () => void;
};

const AddWorkout: FC<AddWorkoutProps> = (props: AddWorkoutProps) => {
  const [workoutName, setWorkoutName] = useState("");
  const { addWorkout } = useWorkoutStore();

  const onAddWorkout = () => {
    addWorkout({
      name: workoutName,
      exercises: [],
    } as IWorkout);

    props.onClose();
  };

  const closeText = (
    <>
      <FontAwesomeIcon icon={faClose} />
      Cancel
    </>
  );

  const confirmText = (
    <>
      <FontAwesomeIcon icon={faPlus} />
      Add
    </>
  );

  const addModal = (
    <Modal
      closeText={closeText}
      confirmText={confirmText}
      disableConfirmButton={!workoutName?.length}
      onModalClose={props.onClose}
      onModalConfirm={onAddWorkout}
      preventDefault={true}
      showFromBottom={true}
      title="Add Workout"
    >
      <label className="input input-bordered flex items-center gap-2 bg-secondary">
        Name
        <input
          className="bg-primary grow"
          onChange={(event) => setWorkoutName(event?.target?.value)}
          placeholder="New Workout"
          type="text"
        />
      </label>
    </Modal>
  );

  return <>{addModal}</>;
};

export default AddWorkout;
