import { FC, useState } from "react";
import Modal from "./ui/Modal";

const AddExercise: FC = () => {
  const [showModal, setShowModal] = useState(true);

  const addModal = (
    <Modal
      onModalConfirm={() => {}}
      onModalClose={() => setShowModal(false)}
      showModal={showModal}
      title="Add Exercise"
    >
      Add
    </Modal>
  );

  return <>{addModal}</>;
};

export default AddExercise;
