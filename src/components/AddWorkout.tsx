import { FC, useState } from "react";
import Modal from "./ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

export type AddWorkoutProps = {
  onAdd: (workoutName: string) => void;
  onCancel: () => void;
};

const AddWorkout: FC<AddWorkoutProps> = (props: AddWorkoutProps) => {
  const [workoutName, setWorkoutName] = useState("");

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
      onModalClose={props.onCancel}
      onModalConfirm={() => props.onAdd(workoutName)}
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
