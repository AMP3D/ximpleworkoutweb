import { FC, useState } from "react";
import { useWorkoutStore } from "../store/workoutStore";
import { parseWorkouts } from "../helpers/fileHelper";
import { IWorkout } from "../models";
import Modal from "./ui/Modal";
import { useErrorStore } from "../store/errorStore";

export type ImportFileReloadModalProps = {
  onModalClose: () => void;
};

const ImportFileModal: FC<ImportFileReloadModalProps> = (
  props: ImportFileReloadModalProps
) => {
  const [file, setFile] = useState<File | undefined>();
  const { addWorkout, clearWorkouts } = useWorkoutStore();
  const { addError } = useErrorStore();

  const onImportConfirm = async () => {
    if (file?.size) {
      const fileBlob = await file.text();
      const fileWorkouts = JSON.parse(fileBlob) as IWorkout[];
      const result = parseWorkouts(fileWorkouts);

      if (result.errors?.length) {
        result.errors.forEach((error) => addError(error));
      } else {
        clearWorkouts();

        result.workouts.forEach((workout) => addWorkout(workout));
      }
    } else {
      addError("Could not load data from file.");
    }

    props.onModalClose();
  };

  const onImportFileClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    setFile(file);
  };

  return (
    <Modal
      disableConfirmButton={!file?.size}
      onModalConfirm={onImportConfirm}
      onModalClose={props.onModalClose}
      preventDefault={true}
      title="Import File"
    >
      <div>
        <input
          accept=".json"
          className="bg-primary file-input file-input-bordered file-input-accent w-full max-w-xs"
          type="file"
          onChange={onImportFileClick}
        />
      </div>
    </Modal>
  );
};

export default ImportFileModal;
