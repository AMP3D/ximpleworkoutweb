import "./App.css";
import BottomNav from "./components/BottomNav";
import Workouts from "./components/Workouts";
import { FC } from "react";
import { useWorkoutStore } from "./store/workoutStore";
import { useShallow } from "zustand/react/shallow";
import workoutFile from "../sample-workout.json";
import { IWorkout } from "./models";

const App: FC = () => {
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

      const fileWorkouts = workoutFile.workouts as IWorkout[];
      fileWorkouts.forEach((workout) => addWorkout(workout));
    }
  };

  hydrateStorage();

  return (
    <div className="m-2">
      <Workouts />

      <BottomNav onReloadClick={() => hydrateStorage(true)} />
    </div>
  );
};

export default App;
