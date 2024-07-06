import { FC } from "react";
import Modal from "./ui/Modal";
import { useWorkoutStore } from "../store/workoutStore";
import { convertToBlob } from "../helpers/fileHelper";
import FileSaver from "file-saver";
import { useErrorStore } from "../store/errorStore";
import dayjs from "dayjs";

export type ExportFileModalProps = {
  onModalClose: () => void;
};

const ExportFileModal: FC<ExportFileModalProps> = (
  props: ExportFileModalProps
) => {
  const { workouts } = useWorkoutStore();
  const { addError } = useErrorStore();

  const onExportConfirm = () => {
    if (workouts?.length) {
      const workoutsBlob = convertToBlob(workouts);
      const fileDate = dayjs().format("YYYY-MM-DDTHH-mm-ss");

      const file = new File([workoutsBlob], `ximple-export-${fileDate}.json`, {
        type: "text/plain;charset=utf-8",
      });

      FileSaver.saveAs(file);
    } else {
      addError("No workouts to export.");
    }

    props.onModalClose();
  };

  return (
    <Modal
      onModalConfirm={onExportConfirm}
      onModalClose={props.onModalClose}
      preventDefault={true}
      title="Confirm"
    >
      <div>Are you sure you want to export the workout file? </div>
    </Modal>
  );
};

export default ExportFileModal;
