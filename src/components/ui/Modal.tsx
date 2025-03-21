import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useRef } from "react";

export type ModalProps = {
  children: React.ReactNode;
  closeText?: React.ReactNode;
  confirmText?: React.ReactNode;
  disableConfirmButton?: boolean;
  modalId?: string;
  onModalClose: () => void;
  onModalConfirm?: () => void;
  preventDefault?: boolean;
  showFromBottom?: boolean;
  showModal?: boolean;
  title: string;
};

const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    closeText,
    confirmText,
    disableConfirmButton,
    onModalClose,
    onModalConfirm,
    preventDefault = false,
    showModal = true,
    showFromBottom = true,
    title,
  } = props;

  const modalId = props.modalId || `modal-${title}`;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const fireEvent = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callBack: (() => void) | undefined
  ) => {
    preventDefault && event.preventDefault();
    callBack !== undefined && callBack();
  };

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
    if (modalRef?.current && showModal) {
      modalRef?.current?.showModal();
    } else {
      closeBtnRef.current?.click();
    }
  }, [modalRef, showModal]);

  const showFromClass = showFromBottom ? "modal-bottom" : "";

  return (
    <>
      <dialog
        ref={modalRef}
        id={modalId}
        className={`modal sm:modal-middle text-white ${showFromClass}`}
      >
        <div className="modal-box bg-primary">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              {onModalConfirm && (
                <button
                  className="btn btn-success mx-9 text-white"
                  disabled={disableConfirmButton}
                  onClick={(event) => fireEvent(event, onModalConfirm)}
                >
                  {confirmText ? (
                    confirmText
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCheck} />
                      Confirm
                    </>
                  )}
                </button>
              )}

              <button
                className="btn btn-secondary text-white"
                onClick={(event) => fireEvent(event, onModalClose)}
                ref={closeBtnRef}
              >
                {closeText ? (
                  closeText
                ) : (
                  <>
                    <FontAwesomeIcon icon={faClose} />
                    Close
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
