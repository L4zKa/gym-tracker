import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Days from "../components/Days/Days";
import Plans from "../components/Plans/Plans";
import Exercises from "../components/Exercises/Exercises";
import FrogTheme from "../components/FrogTheme";

export default function FrontendRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/days" element={<Days />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/frog" element={<FrogTheme />} />
      {/*   <Route path="/training-days" element={<TrainingDaysPage />} /> */}
    </Routes>
  );
}
