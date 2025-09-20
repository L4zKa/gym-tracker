import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import LogsViewer from "../components/LogViewer/LogsViewer";
import AddWorkout from "../components/AddWorkout/AddWorkout";
import WorkoutTemplates from "../components/WorkoutTemplates/WorkoutTemplates";

export default function FrontendRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/logViewer" element={<LogsViewer />} />
      <Route path="/addWorkout" element={<AddWorkout />} />
      <Route path="/workoutTemplates" element={<WorkoutTemplates />} />
      {/*   <Route path="/training-days" element={<TrainingDaysPage />} /> */}
    </Routes>
  );
}
