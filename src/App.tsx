import "./App.css";
import BottomNav from "./components/BottomNav";
import Workouts from "./components/Workouts";
import { FC } from "react";
import { useWorkoutStore } from "./store/workoutStore";
import { useShallow } from "zustand/react/shallow";
import Errors from "./components/Errors";
import { useErrorStore } from "./store/errorStore";
import { importSampleFile } from "./helpers";

const App: FC = () => {
  const { addError, errors } = useErrorStore();

  const { workouts, addWorkout, clearWorkouts } = useWorkoutStore(
    useShallow((state) => ({
      addWorkout: state.addWorkout,
      clearWorkouts: state.clearWorkouts,
      workouts: state.workouts,
    }))
  );

  const hydrateStorage = (reload: boolean = false) => {
    if (reload || !workouts?.length) {
      if (reload) {
        clearWorkouts();
      }

      const fileWorkouts = importSampleFile();
      if (fileWorkouts.errors?.length) {
        fileWorkouts.errors.forEach((error) => addError(error));
      } else {
        fileWorkouts.workouts?.forEach((workout) => addWorkout(workout));
      }
    }
  };

  if (!errors?.length) {
    hydrateStorage();
  }

  return (
    <div className="m-2">
      <div className="mb-9 pb-9">
        <Workouts />
      </div>

      <BottomNav onReloadClick={() => hydrateStorage(true)} />

      <div className="absolute inset-x-2 bottom-20">
        <Errors errors={errors} />
      </div>
    </div>
  );
};

export default App;
