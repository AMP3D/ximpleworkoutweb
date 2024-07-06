import { IWorkout } from "../models";
import { FC, useState } from "react";
import Exercise from "./Exercise";
import Collapse from "./ui/Collapse";
import { useSetStore } from "../store/setStore";
import { convertToSetId } from "../helpers/stringHelper";
import AddEditButton from "./ui/AddEditButton";
import AddExercise from "./AddExercise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import RemoveExercise from "./RemoveExercise";
import { useWorkoutStore } from "../store/workoutStore";

export type WorkoutProps = {
  workout: IWorkout;
};

const Workout: FC<WorkoutProps> = (props) => {
  const { workout } = props;
  const { completedSetIds } = useSetStore();
  const { moveExercise } = useWorkoutStore();

  const [showAddExercise, setShowAddExercise] = useState(false);
  const [removeExerciseName, setRemoveExerciseName] = useState<string>();

  const onRemoveExercise = (exerciseName: string) => {
    setRemoveExerciseName(exerciseName);
  };

  const exercises = workout?.exercises?.map((exercise, index) => {
    const exerciseComplete =
      exercise?.sets?.length &&
      exercise?.sets.every((_, index) => {
        const setId = convertToSetId(workout.name, exercise?.name, index);

        return !!completedSetIds[setId];
      });

    const className = exerciseComplete
      ? "bg-success line-through italic"
      : "bg-secondary";

    const headerBtnClasses = "btn btn-primary btn-xs text-white z-10 relative";

    return (
      <Collapse
        classNames={className}
        key={`exercise-${index}`}
        primaryHeaderText={<span>Exercise: </span>}
        secondaryHeaderText={exercise?.name}
        headerButtonsRow={
          <div className="grid grid-cols-9 my-2">
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
        }
      >
        <Exercise exercise={exercise} workoutName={workout.name} />
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
