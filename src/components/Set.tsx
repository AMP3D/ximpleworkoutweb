import { getTotalWeight } from "../helpers/weightHelper";
import { ISet } from "../models";
import { FC, useMemo } from "react";

export type SetProps = {
  isCompleted: boolean;
  onComplete: (isCompleted: boolean) => void;
  set: ISet;
  setIndex: number;
};

const Set: FC<SetProps> = (props) => {
  const weights = useMemo(() => props.set.weights.join(", "), [props.set]);
  const totalWeight = useMemo(() => getTotalWeight(props.set), [props.set]);

  return (
    <div className="rounded-box px-3 py-1 text-xs">
      <div className="grid grid-cols-2">
        <div>
          <span>Set: </span>
          <span className="text-accent font-bold">{props.setIndex + 1}</span>
        </div>

        <div>
          <span>Reps: </span>
          <span className="text-secondary font-bold">{props.set.reps}</span>
        </div>
      </div>

      {!!totalWeight && (
        <div className="grid grid-cols-2 my-2">
          <div>
            <span>Total Weight (lb): </span>
            <span className="text-secondary">{totalWeight}</span>
          </div>

          <div>
            <span>Weights (lb): </span>
            <span className="text-secondary">{weights}</span>
          </div>
        </div>
      )}

      {!!props.set.notes && (
        <div>
          <span>Notes: </span>
          <span className="text-secondary">{props.set.notes}</span>
        </div>
      )}

      <div>
        <div className="form-control items-end">
          <label className="label cursor-pointer">
            <span className="label-text pr-9">Completed:</span>
            <input
              defaultChecked={props.isCompleted}
              type="checkbox"
              className="checkbox checkbox-success checkbox-lg"
              onChange={() => props.onComplete(!props.isCompleted)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Set;
