import { Button, Field, Input } from "@fluentui/react-components";
import { useState } from "react";
import type ITemplateDay from "../../models/ITemplateDay";
import WorkoutDay from "./MapExercises";

export default function WorkoutTemplates() {
  const [allPlans, setAllPlans] = useState<ITemplateDay[]>([]);
  const [newPlan, setNewPlan] = useState<ITemplateDay>({
    name: "New Workout",
    templateExercises: [],
    id: "",
    createdAt: new Date(),
  });
  const handleNewPlanChange = <K extends keyof ITemplateDay>(key: K, value: ITemplateDay[K]) => {
    setNewPlan((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addNewWorkoutTemplate = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlan),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Fehler: " + error.error);
        return;
      }

      //* Set new Plans
      const data: ITemplateDay[] = await res.json();
      setAllPlans(data);
      //*
    } catch (err) {
      console.error(err);
      alert("Request fehlgeschlagen");
    }
  };

  return (
    <>
      <h1>Workout Templates</h1>

      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <h1
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleNewPlanChange("name", (e.target as HTMLElement).innerText)}
          style={{ opacity: newPlan.name == "New Workout" ? "0.4" : "" }}
        >
          {newPlan.name}
        </h1>
      </div>

      <hr style={{ margin: "25px" }} />
      <WorkoutDay />
    </>
  );
}
