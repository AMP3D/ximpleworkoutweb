import { IWorkout } from "../models";
import { FC, useState } from "react";
import Exercise from "./Exercise";
import Collapse from "./ui/Collapse";
import { useSetStore } from "../store/setStore";
import { convertToSetId } from "../helpers/stringHelper";
import AddButton from "./ui/AddButton";
import AddExercise from "./AddExercise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import RemoveExercise from "./RemoveExercise";

export type WorkoutProps = {
  workout: IWorkout;
};

const Workout: FC<WorkoutProps> = (props) => {
  const { workout } = props;
  const { completedSetIds } = useSetStore();

  const [showAddExercise, setShowAddExercise] = useState(false);
  const [removeExerciseName, setRemoveExerciseName] = useState<string>();

  const onRemoveExercise = (exerciseName: string) => {
    setRemoveExerciseName(exerciseName);
  };

  const exercises = workout.exercises.map((exercise, index) => {
    const exerciseComplete =
      exercise.sets?.length &&
      exercise.sets.every((_, index) => {
        const setId = convertToSetId(workout.name, exercise.name, index);

        return !!completedSetIds[setId];
      });

    const className = exerciseComplete
      ? "bg-success line-through italic"
      : "bg-secondary";

    return (
      <Collapse
        classNames={className}
        key={`exercise-${index}`}
        primaryHeaderText={
          <>
            <span className="mr-3 z-10 relative">
              <button
                aria-label="Remove Exercise"
                className="btn btn-primary btn-sm text-white"
                onClick={() => onRemoveExercise(exercise.name)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </span>

            <span>Exercise: </span>
          </>
        }
        secondaryHeaderText={exercise.name}
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

      <AddButton
        onAddClick={() => setShowAddExercise(true)}
        buttonText="Add Exercise"
        backgroundClassName="bg-secondary"
      />
    </>
  );
};

export default Workout;
