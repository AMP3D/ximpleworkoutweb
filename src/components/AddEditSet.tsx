import { FC, useState } from "react";
import Modal from "./ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ISet } from "../models";
import { useWorkoutStore } from "../store/workoutStore";
import { parseWeights } from "../helpers/weightHelper";

export type AddEditSetProps = {
  exerciseName: string;
  editSetIndex?: number;
  onClose: () => void;
  set?: ISet;
  workoutName: string;
};

const AddEditSet: FC<AddEditSetProps> = (props: AddEditSetProps) => {
  const { exerciseName, editSetIndex, set, workoutName } = props;
  const { addEditSet } = useWorkoutStore();

  const [notes, setNotes] = useState(set?.notes ?? "");
  const [reps, setReps] = useState<number | undefined>(set?.reps ?? undefined);
  const [weights, setWeights] = useState(set?.weights?.join(", ") ?? "");

  const isEdit = editSetIndex !== undefined;

  const closeText = (
    <>
      <FontAwesomeIcon icon={faClose} />
      Cancel
    </>
  );

  const confirmText = (
    <>
      <FontAwesomeIcon icon={faPlus} />
      {editSetIndex !== undefined ? "Edit" : "Add"}
    </>
  );

  const onModalConfirm = () => {
    const weightsParsed = weights?.length ? parseWeights(weights) : [0];

    const set = {
      notes,
      reps: reps !== undefined ? Math.abs(reps) : reps,
      weights: weightsParsed
        ?.filter((weight) => !isNaN(weight))
        ?.map((weight) => Math.abs(weight)),
    } as ISet;

    addEditSet(workoutName, exerciseName, set, editSetIndex);

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
      title={isEdit ? "Edit Set" : "Add Set"}
    >
      <label className="input input-bordered flex items-center gap-2 bg-secondary mt-3">
        Reps
        <input
          className="bg-primary grow"
          onChange={(event) =>
            setReps(event?.target?.value as unknown as number)
          }
          placeholder="15"
          value={reps}
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
            value={weights}
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
            value={notes}
            type="text"
          />
        </div>
      </div>
    </Modal>
  );

  return <>{addModal}</>;
};

export default AddEditSet;
