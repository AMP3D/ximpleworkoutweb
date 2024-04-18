import { IExercise } from "../models";
import { FC, useMemo } from "react";
import Set from "./Set";
import { convertToSetId } from "../helpers/stringHelper";
import { getTotalVolume } from "../helpers/weightHelper";
import { useSetStore } from "../store/setStore";
import React from "react";

export type ExerciseProps = {
  exercise: IExercise;
  workoutName: string;
};

const ExerciseComponent: FC<ExerciseProps> = (props) => {
  const { exercise, workoutName } = props;
  const { completedSetIds, setCompletedSetId } = useSetStore();
  const totalVolume = useMemo(
    () => getTotalVolume(exercise.sets),
    [exercise.sets]
  );

  const musclesWorked = useMemo(
    () => exercise.muscles?.join(", "),
    [exercise.muscles]
  );

  const sets = exercise.sets.map((set, index) => {
    const setId = convertToSetId(workoutName, exercise.name, index);
    const isCompleted = !!completedSetIds[setId];

    const onComplete = () => {
      setCompletedSetId(setId, !isCompleted);
    };

    const bgColor = isCompleted ? "bg-teal-950" : "bg-secondary-content";

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

const Exercise = React.memo(ExerciseComponent);
export default Exercise;
