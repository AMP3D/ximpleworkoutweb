import { FC, useState } from "react";
import Modal from "./ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IExercise } from "../models";
import { useWorkoutStore } from "../store/workoutStore";

export type AddExerciseProps = {
  onClose: () => void;
  workoutName: string;
};

const AddExercise: FC<AddExerciseProps> = (props: AddExerciseProps) => {
  const { workoutName } = props;
  const { addExercise } = useWorkoutStore();

  const [exerciseName, setExerciseName] = useState("");
  const [musclesWorked, setMusclesWorked] = useState("");

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

  const onModalConfirm = () => {
    const musclesParsed = musclesWorked.split(/[ ,]+/) || undefined;
    const exercise = {
      name: exerciseName,
      muscles: musclesParsed,
      sets: [],
    } as IExercise;

    addExercise(workoutName, exercise);

    props.onClose();
  };

  const addModal = (
    <Modal
      closeText={closeText}
      confirmText={confirmText}
      disableConfirmButton={!exerciseName?.length}
      onModalClose={props.onClose}
      onModalConfirm={onModalConfirm}
      preventDefault={true}
      showFromBottom={true}
      title="Add Exercise"
    >
      <label className="input input-bordered flex items-center gap-2 bg-secondary">
        Name
        <input
          className="bg-primary grow"
          onChange={(event) => setExerciseName(event?.target?.value)}
          placeholder="New Exercise"
          type="text"
        />
      </label>

      <div className="mt-3">
        <label className="pl-1">Muscles worked (separate with commas):</label>

        <div className="input input-bordered flex items-center gap-2 bg-secondary">
          <input
            className="bg-primary grow"
            onChange={(event) => setMusclesWorked(event?.target?.value)}
            placeholder="Traps, Lats"
            type="text"
          />
        </div>
      </div>
    </Modal>
  );

  return <>{addModal}</>;
};

export default AddExercise;
