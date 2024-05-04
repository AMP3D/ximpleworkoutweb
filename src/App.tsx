import "./App.css";
import Workouts from "./components/Workouts";
import { FC } from "react";
import { useWorkoutStore } from "./store/workoutStore";
import { useShallow } from "zustand/react/shallow";
import Errors from "./components/Errors";
import { useErrorStore } from "./store/errorStore";
import { importSampleFile } from "./helpers";
import NavBar from "./components/NavBar";
import { useAppStore } from "./store/appStore";

const App: FC = () => {
  const { addError, errors, clearErrors } = useErrorStore();
  const { hasHydrated, setHasHydrated } = useAppStore();

  const { workouts, addWorkout, clearWorkouts } = useWorkoutStore(
    useShallow((state) => ({
      addWorkout: state.addWorkout,
      clearWorkouts: state.clearWorkouts,
      workouts: state.workouts,
    }))
  );

  const hydrateStorage = (reload: boolean = false) => {
    // Only hydrate if user initiated or it's the first time and there's no workouts defined
    if (reload || (!hasHydrated && !workouts?.length)) {
      if (reload) {
        clearWorkouts();
      }

      const result = importSampleFile();
      if (result.errors?.length) {
        result.errors.forEach((error) => addError(error));
      } else {
        result.workouts?.forEach((workout) => addWorkout(workout));
      }

      setHasHydrated(true);
    }
  };

  if (!errors?.length) {
    hydrateStorage();
  }

  return (
    <>
      <NavBar onReloadClick={() => hydrateStorage(true)} />

      <div className="m-2 text-white">
        <div className="mb-9 pb-9">
          <Workouts />
        </div>

        <div className="absolute inset-x-2 bottom-20">
          <Errors errors={errors} onDismiss={clearErrors} />
        </div>
      </div>
    </>
  );
};

export default App;
