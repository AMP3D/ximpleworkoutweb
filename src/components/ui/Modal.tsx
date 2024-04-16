import { FC, useEffect, useRef } from "react";

export type ModalProps = {
  children: React.ReactNode;
  isConfirmModal?: boolean;
  modalId?: string;
  onModalClose: () => void;
  onModalConfirm?: () => void;
  showModal: boolean;
  title: string;
};

const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    isConfirmModal,
    onModalClose,
    onModalConfirm,
    showModal,
    title,
  } = props;

  const modalId = props.modalId || `modal-${title}`;
  const modal = document?.getElementById(modalId) as HTMLFormElement;
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onModalClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onModalClose]);

  // Handle show/hide
  useEffect(() => {
    if (showModal) {
      modal?.showModal();
    } else {
      closeBtnRef.current?.click();
    }
  }, [modal, showModal]);

  return (
    <>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              {isConfirmModal && (
                <button
                  className="btn btn-accent mx-14"
                  onClick={onModalConfirm}
                >
                  Confirm
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={onModalClose}
                ref={closeBtnRef}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
