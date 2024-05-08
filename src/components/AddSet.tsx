import { FC, useState } from "react";
import Modal from "./ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ISet } from "../models";
import { useWorkoutStore } from "../store/workoutStore";

export type AddSetProps = {
  exerciseName: string;
  onClose: () => void;
  workoutName: string;
};

const AddSet: FC<AddSetProps> = (props: AddSetProps) => {
  const { exerciseName, workoutName } = props;
  const { addSet } = useWorkoutStore();

  const [notes, setNotes] = useState("");
  const [reps, setReps] = useState<number | undefined>();
  const [weights, setWeights] = useState("");

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
    const weightsParsed = weights?.length
      ? weights.split(/[ ,]+/)?.map((weight) => parseInt(weight))
      : [0];

    const set = {
      notes,
      reps,
      weights: weightsParsed.filter((weight) => !isNaN(weight)),
    } as ISet;

    addSet(workoutName, exerciseName, set);

    props.onClose();
  };

  const addModal = (
    <Modal
      closeText={closeText}
      confirmText={confirmText}
      disableConfirmButton={reps === undefined}
      onModalClose={props.onClose}
      onModalConfirm={onModalConfirm}
      preventDefault={true}
      showFromBottom={true}
      title="Add Set"
    >
      <label className="input input-bordered flex items-center gap-2 bg-secondary mt-3">
        Reps
        <input
          className="bg-primary grow"
          onChange={(event) =>
            setReps(event?.target?.value as unknown as number)
          }
          placeholder="15"
          type="number"
        />
      </label>

      <div className="mt-3">
        <label className="pl-1">Weights (separate with commas):</label>

        <div className="input input-bordered flex items-center gap-2 bg-secondary">
          <input
            className="bg-primary grow"
            onChange={(event) => setWeights(event?.target?.value)}
            placeholder="5, 10, 25"
            type="text"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="pl-1">Notes:</label>

        <div className="input input-bordered flex items-center gap-2 bg-secondary">
          <input
            className="bg-primary grow"
            onChange={(event) => setNotes(event?.target?.value)}
            placeholder="This is a warm-up set"
            type="text"
          />
        </div>
      </div>
    </Modal>
  );

  return <>{addModal}</>;
};

export default AddSet;
