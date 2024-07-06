import { IExercise } from "../models";
import { FC, useMemo, useState } from "react";
import Set from "./Set";
import { convertToSetId } from "../helpers/stringHelper";
import { getTotalVolume } from "../helpers/weightHelper";
import { useSetStore } from "../store/setStore";
import React from "react";
import AddEditButton from "./ui/AddEditButton";
import AddEditSet from "./AddEditSet";
import RemoveSet from "./RemoveSet";
import { MoveDirection } from "../models/Move";
import { useWorkoutStore } from "../store/workoutStore";

export type ExerciseProps = {
  exercise: IExercise;
  workoutName: string;
};

const ExerciseComponent: FC<ExerciseProps> = (props) => {
  const { exercise, workoutName } = props;
  const { completedSetIds, setCompletedSetId } = useSetStore();
  const { copySet, moveSet } = useWorkoutStore();

  const [editSetIndex, setEditSetIndex] = useState<number>();
  const [removeSetIndex, setRemoveSetIndex] = useState<number>();
  const [showAddEditSet, setShowAddEditSet] = useState(false);

  const onCloseAddEditSet = () => {
    setShowAddEditSet(false);
    setEditSetIndex(undefined);
  };

  const onCopySet = (setIndex: number) => {
    copySet(workoutName, exercise?.name, setIndex);
  };

  const onEditSet = (setIndex: number) => {
    setEditSetIndex(setIndex);
    setShowAddEditSet(true);
  };

  const onMoveSet = (setIndex: number, direction: MoveDirection) => {
    moveSet(workoutName, exercise?.name, setIndex, direction);
  };

  const onRemoveSet = (setIndex: number) => {
    setRemoveSetIndex(setIndex);
  };

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
          onCopySet={onCopySet}
          onEditSet={onEditSet}
          onMoveSet={onMoveSet}
          onRemoveSet={onRemoveSet}
        />
      </div>
    );
  });

  const editSet =
    editSetIndex !== undefined ? exercise.sets[editSetIndex] : undefined;

  return (
    <>
      {showAddEditSet && (
        <AddEditSet
          onClose={onCloseAddEditSet}
          editSetIndex={editSetIndex}
          exerciseName={exercise?.name}
          set={editSet}
          workoutName={workoutName}
        />
      )}

      {removeSetIndex !== undefined && (
        <RemoveSet
          onClose={() => setRemoveSetIndex(undefined)}
          exerciseName={exercise?.name}
          setIndex={removeSetIndex}
          workoutName={workoutName}
        />
      )}

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

      <AddEditButton
        onAddEditClick={() => setShowAddEditSet(true)}
        buttonText={"Add Set"}
        backgroundClassName="bg-secondary-content"
        isEdit={false}
      />
    </>
  );
};

const Exercise = React.memo(ExerciseComponent);
export default Exercise;
