import { FC } from "react";
import Modal from "./ui/Modal";
import { useWorkoutStore } from "../store/workoutStore";

export type RemoveExerciseProps = {
  onClose: () => void;
  exerciseName: string;
  workoutName: string;
};

const RemoveExercise: FC<RemoveExerciseProps> = (
  props: RemoveExerciseProps
) => {
  const { onClose, exerciseName, workoutName } = props;
  const { removeExercise } = useWorkoutStore();

  const onRemoveExerciseConfirm = () => {
    removeExercise(workoutName, exerciseName);

    onClose();
  };

  return (
    <Modal
      onModalConfirm={onRemoveExerciseConfirm}
      onModalClose={onClose}
      preventDefault={true}
      title="Confirm"
    >
      <div>Are you sure you want to remove this exercise? </div>
    </Modal>
  );
};

export default RemoveExercise;
