import { IExercise } from "../models";
import { FC, useMemo } from "react";
import Set from "./Set";
import { convertToSetId } from "../helpers/stringHelper";
import { getTotalVolume } from "../helpers/weightHelper";
import { useSetStore } from "../store/setStore";

export type ExerciseProps = {
  exercise: IExercise;
  workoutName: string;
};

const Exercise: FC<ExerciseProps> = (props) => {
  const { completedSetIds, setCompletedSetId } = useSetStore();
  const totalVolume = useMemo(
    () => getTotalVolume(props.exercise.sets),
    [props.exercise.sets]
  );

  const musclesWorked = useMemo(
    () => props.exercise.muscles?.join(", "),
    [props.exercise.muscles]
  );

  const sets = props.exercise.sets.map((set, index) => {
    const setId = convertToSetId(props.workoutName, props.exercise.name, index);
    const isCompleted = !!completedSetIds[setId];

    const onComplete = () => {
      setCompletedSetId(setId, !isCompleted);
    };

    const bgColor = isCompleted ? "bg-success-content" : "bg-secondary-content";

    return (
      <div
        className={`${bgColor} rounded-box px-3 py-1 my-2`}
        key={`set-${index}`}
      >
        <Set
          set={set}
          setIndex={index}
          isCompleted={isCompleted}
          onComplete={onComplete}
        />
      </div>
    );
  });

  return (
    <>
      {!!totalVolume && (
        <div className="text-xs text-end">
          <span>Muscles: </span>
          <span className="text-secondary">{musclesWorked}</span>
        </div>
      )}

      {!!totalVolume && (
        <div className="text-xs text-end">
          <span>Total Volume (lb): </span>
          <span className="text-secondary">{totalVolume}</span>
        </div>
      )}

      {sets}
    </>
  );
};

export default Exercise;
