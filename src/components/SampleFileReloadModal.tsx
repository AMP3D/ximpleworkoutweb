import { FC } from "react";
import Modal from "./ui/Modal";
import Alert from "./ui/Alert";

export type SampleFileReloadModalProps = {
  onReloadClick: () => void;
  onModalClose: () => void;
};

const SampleFileReloadModal: FC<SampleFileReloadModalProps> = (
  props: SampleFileReloadModalProps
) => {
  const { onReloadClick } = props;

  const onReloadConfirm = () => {
    onReloadClick();

    props.onModalClose();
  };

  return (
    <Modal
      onModalConfirm={onReloadConfirm}
      onModalClose={props.onModalClose}
      preventDefault={true}
      title="Confirm"
    >
      <div>Are you sure you want to reload the sample workout file? </div>
      <div className="my-5">
        <Alert
          alertType="warning"
          title="This will clear all work-out definitions and set them to the sample file!"
        />
      </div>
    </Modal>
  );
};

export default SampleFileReloadModal;
