import { FC, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Modal from "./ui/Modal";

export type BottomNavProps = {
  onReloadClick: () => void;
};

const BottomNav: FC<BottomNavProps> = (props) => {
  const { onReloadClick } = props;
  const [showReloadConfirm, setShowReloadConfirm] = useState(false);
  const onReloadConfirm = () => {
    onReloadClick();

    setShowReloadConfirm(false);
  };

  return (
    <>
      <Modal
        isConfirmModal={true}
        onModalConfirm={onReloadConfirm}
        onModalClose={() => setShowReloadConfirm(false)}
        showModal={showReloadConfirm}
        title="Confirm"
      >
        Are you sure you want to reload the workout file?
      </Modal>

      <div className="bg-primary-content btm-nav">
        <button onClick={() => setShowReloadConfirm(true)}>
          <FontAwesomeIcon icon={faRefresh} />
          <span className="btm-nav-label">Reload File</span>
        </button>
      </div>
    </>
  );
};

export default BottomNav;
