import { useState } from "react";
import AddTemplate from "./AddTemplate";
import AllTemplates from "./AllTemplates";

export default function WorkoutTemplates() {
  const [addNew, setAddNew] = useState<boolean>(false);
  return (
    <>
      <h1>Workout Templates</h1>
      {!addNew && <AllTemplates />}
      {addNew && <AddTemplate />}
    </>
  );
}
