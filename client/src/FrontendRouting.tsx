import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogsViewer from "./components/LogViewer/LogsViewer";
import AddWorkout from "./components/AddWorkout/AddWorkout";

export default function FrontendRouting() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LogsViewer} />
        <Route path="/addWorkout" component={AddWorkout} />
        {/*   <Route path="/training-days" element={<TrainingDaysPage />} /> */}
      </Switch>
    </BrowserRouter>
  );
}
