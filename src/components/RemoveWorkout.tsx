import { FC } from "react";
import Modal from "./ui/Modal";
import { useWorkoutStore } from "../store/workoutStore";

export type RemoveWorkoutProps = {
  onClose: () => void;
  workoutName: string;
};

const RemoveWorkout: FC<RemoveWorkoutProps> = (props: RemoveWorkoutProps) => {
  const { onClose, workoutName } = props;
  const { removeWorkout } = useWorkoutStore();

  const onRemoveWorkoutConfirm = () => {
    removeWorkout(workoutName);

    onClose();
  };

  return (
    <Modal
      onModalConfirm={onRemoveWorkoutConfirm}
      onModalClose={onClose}
      preventDefault={true}
      title="Confirm"
    >
      <div>Are you sure you want to remove this workout? </div>
    </Modal>
  );
};

export default RemoveWorkout;
