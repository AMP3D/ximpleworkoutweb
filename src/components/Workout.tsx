import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { getLastCompletedSet } from "../helpers";
import { convertToSetId } from "../helpers/stringHelper";
import { IWorkout } from "../models";
import { useSetStore } from "../store/setStore";
import { useWorkoutStore } from "../store/workoutStore";
import AddExercise from "./AddExercise";
import Exercise from "./Exercise";
import RemoveExercise from "./RemoveExercise";
import AddEditButton from "./ui/AddEditButton";
import Collapse from "./ui/Collapse";

export type WorkoutProps = {
  workout: IWorkout;
};

const Workout: FC<WorkoutProps> = (props) => {
  const { workout } = props;
  const { lastCompletedSets, completedSetIds } = useSetStore();
  const { moveExercise } = useWorkoutStore();

  const [showAddExercise, setShowAddExercise] = useState(false);
  const [removeExerciseName, setRemoveExerciseName] = useState<string>();

  const onRemoveExercise = (exerciseName: string) => {
    setRemoveExerciseName(exerciseName);
  };

  const exercises = workout?.exercises?.map((exercise, index) => {
    let lastCompleted: string | undefined;

    const exerciseComplete =
      exercise?.sets?.length &&
      exercise?.sets.every((_, index) => {
        const setId = convertToSetId(workout.name, exercise?.name, index);

        return !!completedSetIds[setId];
      });

    if (exerciseComplete) {
      const lastSetIndex = exercise?.sets?.length - 1;

      lastCompleted = getLastCompletedSet(
        workout,
        exercise,
        lastSetIndex,
        lastCompletedSets
      );
    }

    const className = exerciseComplete
      ? "bg-success line-through italic"
      : "bg-secondary";

    const headerBtnClasses = "btn btn-primary btn-sm text-white z-10 relative";

    return (
      <Collapse
        classNames={className}
        key={`exercise-${index}`}
        primaryHeaderText={<span>Exercise: </span>}
        secondaryHeaderText={exercise?.name}
        headerButtonsRow={
          <div>
            <div className="grid grid-cols-6 my-2">
              <div className="">
                <button
                  aria-label="Remove Exercise"
                  className={`${headerBtnClasses}`}
                  onClick={() => onRemoveExercise(exercise?.name)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="">
                <button
                  aria-label="Move Exercise Upwards"
                  className={`${headerBtnClasses}`}
                  onClick={() => moveExercise(workout?.name, index, "up")}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
              </div>
              <div className="">
                <button
                  aria-label="Move Exercise Downwards"
                  className={`${headerBtnClasses}`}
                  onClick={() => moveExercise(workout?.name, index, "down")}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>

            <div className="text-xs text-start mt-1 no-underline not-italic h-5">
              {exerciseComplete ? (
                <>
                  <span>Last completed: </span>
                  <span className="text-base-content">{lastCompleted}</span>
                </>
              ) : null}
            </div>
          </div>
        }
      >
        <Exercise exercise={exercise} workout={workout} />
      </Collapse>
    );
  });

  return (
    <>
      {showAddExercise && (
        <AddExercise
          onClose={() => setShowAddExercise(false)}
          workoutName={workout?.name}
        />
      )}

      {removeExerciseName && (
        <RemoveExercise
          onClose={() => setRemoveExerciseName(undefined)}
          exerciseName={removeExerciseName}
          workoutName={workout?.name}
        />
      )}

      {exercises}

      <AddEditButton
        onAddEditClick={() => setShowAddExercise(true)}
        buttonText="Add Exercise"
        backgroundClassName="bg-secondary"
        isEdit={false}
      />
    </>
  );
};

export default Workout;
