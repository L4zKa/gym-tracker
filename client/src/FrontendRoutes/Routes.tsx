import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Tage from "../components/Tage/Tage";
import Pläne from "../components/Pläne/Pläne";
import Übungen from "../components/Übungen/Übungen";

export default function FrontendRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/days" element={<Tage />} />
      <Route path="/plans" element={<Pläne />} />
      <Route path="/exercises" element={<Übungen />} />
      {/*   <Route path="/training-days" element={<TrainingDaysPage />} /> */}
    </Routes>
  );
}
