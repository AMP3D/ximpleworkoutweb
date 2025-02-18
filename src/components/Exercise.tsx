import React, { FC, useMemo, useState } from "react";
import {
  convertToSetId,
  convertToWorkoutSetId,
  getLastCompletedSet,
} from "../helpers";
import { getTotalVolume } from "../helpers/weightHelper";
import { IExercise, IWorkout } from "../models";
import { MoveDirection } from "../models/Move";
import { useSetStore } from "../store/setStore";
import { useWorkoutStore } from "../store/workoutStore";
import AddEditSet from "./AddEditSet";
import RemoveSet from "./RemoveSet";
import Set from "./Set";
import AddEditButton from "./ui/AddEditButton";

export type ExerciseProps = {
  exercise: IExercise;
  workout: IWorkout;
};

const ExerciseComponent: FC<ExerciseProps> = (props) => {
  const { exercise, workout } = props;
  const {
    completedSetIds,
    lastCompletedSets,
    setCompletedSetId,
    updateLastCompleted,
  } = useSetStore();
  const { copySet, moveSet } = useWorkoutStore();

  const [editSetIndex, setEditSetIndex] = useState<number>();
  const [removeSetIndex, setRemoveSetIndex] = useState<number>();
  const [showAddEditSet, setShowAddEditSet] = useState(false);

  const onCloseAddEditSet = () => {
    setShowAddEditSet(false);
    setEditSetIndex(undefined);
  };

  const onCopySet = (setIndex: number) => {
    copySet(workout.name, exercise?.name, setIndex);
  };

  const onEditSet = (setIndex: number) => {
    setEditSetIndex(setIndex);
    setShowAddEditSet(true);
  };

  const onMoveSet = (setIndex: number, direction: MoveDirection) => {
    moveSet(workout.name, exercise?.name, setIndex, direction);
  };

  const onRemoveSet = (setIndex: number) => {
    setRemoveSetIndex(setIndex);
  };

  const totalVolume = useMemo(
    () => getTotalVolume(exercise?.sets),
    [exercise?.sets]
  );

  const musclesWorked = useMemo(
    () => exercise?.muscles?.join(", "),
    [exercise?.muscles]
  );

  const sets = exercise?.sets.map((set, index) => {
    const setId = convertToSetId(workout.name, exercise?.name, index);
    const isCompleted = !!completedSetIds[setId];
    let lastCompleted: string | undefined;

    if (isCompleted) {
      lastCompleted = getLastCompletedSet(
        workout,
        exercise,
        index,
        lastCompletedSets
      );
    }

    const onComplete = () => {
      setCompletedSetId(setId, !isCompleted);

      const workoutSetId = convertToWorkoutSetId(
        workout.name,
        exercise?.name,
        index
      );
      updateLastCompleted(workoutSetId);
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
          completedSetIds={completedSetIds}
          isCompleted={isCompleted}
          lastCompleted={lastCompleted}
          onComplete={onComplete}
          onCopySet={onCopySet}
          onEditSet={onEditSet}
          onMoveSet={onMoveSet}
          onRemoveSet={onRemoveSet}
          set={set}
          setId={setId}
          setIndex={index}
        />
      </div>
    );
  });

  const editSet =
    editSetIndex !== undefined ? exercise?.sets[editSetIndex] : undefined;

  return (
    <>
      {showAddEditSet && (
        <AddEditSet
          onClose={onCloseAddEditSet}
          editSetIndex={editSetIndex}
          exerciseName={exercise?.name}
          set={editSet}
          workoutName={workout.name}
        />
      )}

      {removeSetIndex !== undefined && (
        <RemoveSet
          onClose={() => setRemoveSetIndex(undefined)}
          exerciseName={exercise?.name}
          setIndex={removeSetIndex}
          workoutName={workout.name}
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
