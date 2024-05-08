import { FC } from "react";
import Modal from "./ui/Modal";
import { useWorkoutStore } from "../store/workoutStore";

export type RemoveSetProps = {
  exerciseName: string;
  onClose: () => void;
  setIndex: number;
  workoutName: string;
};

const RemoveSet: FC<RemoveSetProps> = (props: RemoveSetProps) => {
  const { onClose, exerciseName, setIndex, workoutName } = props;
  const { removeSet } = useWorkoutStore();

  const onRemoveSetConfirm = () => {
    removeSet(workoutName, exerciseName, setIndex);

    onClose();
  };

  return (
    <Modal
      onModalConfirm={onRemoveSetConfirm}
      onModalClose={onClose}
      preventDefault={true}
      title="Confirm"
    >
      <div>Are you sure you want to remove this set? </div>
    </Modal>
  );
};

export default RemoveSet;
