import {
  faArrowDown,
  faArrowUp,
  faClone,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useMemo } from "react";
import { getTotalWeight } from "../helpers/weightHelper";
import { ISet } from "../models";
import { MoveDirection } from "../models/Move";

export type SetProps = {
  isCompleted: boolean;
  lastCompleted: string | undefined;
  onComplete: (isCompleted: boolean) => void;
  onCopySet: (setIndex: number) => void;
  onEditSet: (setIndex: number) => void;
  onMoveSet: (setIndex: number, direction: MoveDirection) => void;
  onRemoveSet: (setIndex: number) => void;
  set: ISet;
  setIndex: number;
  setId: string;
  completedSetIds: { [key: string]: boolean };
};

const Set: FC<SetProps> = (props) => {
  const {
    isCompleted,
    lastCompleted,
    onComplete,
    onCopySet,
    onEditSet,
    onMoveSet,
    onRemoveSet,
    set,
    setIndex,
  } = props;
  const weights = useMemo(() => set?.weights?.join(", "), [set]);
  const totalWeight = useMemo(() => getTotalWeight(set), [set]);

  return (
    <div className="rounded-box px-3 py-1 text-xs">
      <div className="grid grid-cols-2">
        <div>
          <span>Set: </span>
          <span className="badge badge-primary font-bold">{setIndex + 1}</span>
        </div>

        <div>
          <span>Reps: </span>
          <span className="badge badge-primary font-bold">{set?.reps}</span>
        </div>
      </div>

      {!!totalWeight && (
        <div className="grid grid-cols-2 my-2">
          <div>
            <div>Total Weight (lb): </div>
            <div className="badge badge-neutral font-bold mt-1">
              {totalWeight}
            </div>
          </div>

          <div>
            <div>Weights (lb): </div>
            <div className="text-base-content mt-1">{weights}</div>
          </div>
        </div>
      )}

      {!!set?.notes && (
        <div>
          <div>Notes: </div>
          <div className="text-base-content mt-1">{set?.notes}</div>
        </div>
      )}

      <div className="grid grid-cols-5 z-10 relative mt-3 text-center">
        <div className="">
          <button
            aria-label="Remove Set"
            className="btn btn-primary btn-sm text-white"
            onClick={() => onRemoveSet(setIndex)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className="">
          <button
            aria-label="Edit Set"
            className="btn btn-primary btn-sm text-white"
            onClick={() => onEditSet(setIndex)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="">
          <button
            aria-label="Move Set Upwards"
            className="btn btn-primary btn-sm text-white"
            onClick={() => onMoveSet(setIndex, "up")}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
        <div className="">
          <button
            aria-label="Move Set Downwards"
            className="btn btn-primary btn-sm text-white"
            onClick={() => onMoveSet(setIndex, "down")}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="">
          <button
            aria-label="Copy Set"
            className="btn btn-primary btn-sm text-white"
            onClick={() => onCopySet(setIndex)}
          >
            <FontAwesomeIcon icon={faClone} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center">
          {isCompleted && (
            <div className="text-xs text-left break-words no-underline not-italic">
              <div>Last completed:</div>
              <div className="text-base-content">{lastCompleted}</div>
            </div>
          )}
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span>Completed:</span>
            <input
              defaultChecked={isCompleted}
              type="checkbox"
              className="checkbox checkbox-accent checkbox-lg"
              onChange={() => onComplete(!isCompleted)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Set;
