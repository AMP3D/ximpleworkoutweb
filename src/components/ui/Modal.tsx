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
  const modalId = props.modalId || `modal-${props.title}`;
  const modal = document?.getElementById(modalId) as HTMLFormElement;
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onModalClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Handle show/hide
  useEffect(() => {
    if (props.showModal) {
      modal?.showModal();
    } else {
      closeBtnRef.current?.click();
    }
  }, [props.showModal]);

  return (
    <>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.title}</h3>
          <div className="py-4">{props.children}</div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              {props.isConfirmModal && (
                <button
                  className="btn btn-accent mx-14"
                  onClick={props.onModalConfirm}
                >
                  Confirm
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={props.onModalClose}
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
