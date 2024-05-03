import { FC, useState } from "react";
import Modal from "./ui/Modal";

const AddSet: FC = () => {
  const [showModal, setShowModal] = useState(true);

  const addModal = (
    <Modal
      onModalConfirm={() => {}}
      onModalClose={() => setShowModal(false)}
      showModal={showModal}
      title="Add Set"
    >
      Add
    </Modal>
  );

  return <>{addModal}</>;
};

export default AddSet;
