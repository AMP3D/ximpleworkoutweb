import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-primary-content p-2 text-xl text-end">
      <div className="font-bold text-success">Workit Workout Tracker</div>
    </div>
    <App />
  </React.StrictMode>
);
