import "./App.css";
import Workouts from "./components/Workouts";
import { FC, useEffect } from "react";
import { useWorkoutStore } from "./store/workoutStore";
import { useShallow } from "zustand/react/shallow";
import Errors from "./components/Errors";
import { useErrorStore } from "./store/errorStore";
import { importSampleFile } from "./helpers";
import NavBar from "./components/NavBar";
import { useAppStore } from "./store/appStore";

const App: FC = () => {
  const { addError, errors, clearErrors } = useErrorStore();
  const { hasHydrated, useMobileWidth, setHasHydrated, setUseMobileWidth } =
    useAppStore();

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

  useEffect(() => {
    const handleResize = () => {
      const useMobile = window.innerWidth > 600;

      setUseMobileWidth(useMobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="text-center pt-14">
      <div
        className={`${
          useMobileWidth && "mockup-phone border-primary"
        } text-left`}
      >
        {useMobileWidth && <div className="camera"></div>}

        <div className="bg-base-100">
          <NavBar onReloadClick={() => hydrateStorage(true)} />

          <div className="m-2 text-white phone-1">
            <div className="mb-9 pb-9 min-h-[60vh]">
              <Workouts />
            </div>

            <div className="absolute inset-x-2 bottom-20">
              <Errors errors={errors} onDismiss={clearErrors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
