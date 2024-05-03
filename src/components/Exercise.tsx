import { IExercise } from "../models";
import { FC, useMemo } from "react";
import Set from "./Set";
import { convertToSetId } from "../helpers/stringHelper";
import { getTotalVolume } from "../helpers/weightHelper";
import { useSetStore } from "../store/setStore";
import React from "react";
import AddButton from "./ui/AddButton";

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

    const bgColor = isCompleted
      ? "bg-success line-through italic"
      : "bg-secondary";

    return (
      <div
        className={`${bgColor} rounded-box px-3 py-1 my-2 border border-success`}
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
          <span className="text-base-content">{musclesWorked}</span>
        </div>
      )}

      {!!totalVolume && (
        <div className="text-xs text-end mt-1">
          <span>Total Volume (lb): </span>
          <span className="badge badge-neutral font-bold">{totalVolume}</span>
        </div>
      )}

      {sets}

      <AddButton
        onAddClick={() => {}}
        buttonText="Add Set"
        backgroundClassName="bg-secondary-content"
      />
    </>
  );
};

const Exercise = React.memo(ExerciseComponent);
export default Exercise;
