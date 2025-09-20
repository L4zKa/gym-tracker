import { useEffect, useRef, useState } from "react";
import type ITemplateDay from "../../models/ITemplateDay";
import TemplateExercises from "./TemplateExercises";
import WorkoutTemplates from "./WorkoutTemplates";
import { Button } from "@fluentui/react-components";
import { AddRegular, CheckmarkRegular } from "@fluentui/react-icons";

export default function AddTemplate() {
  const [newPlan, setNewPlan] = useState<ITemplateDay>({
    name: "New Workout",
    templateExercises: [],
    id: 0,
    createdAt: new Date(),
  });
  const [tempTitle, setTempTitle] = useState<string>("");
  const ref = useRef<HTMLHeadingElement>(null);

  // nur beim Mount: Default-Wert setzen
  useEffect(() => {
    if (ref.current && newPlan.name) {
      ref.current.innerText = newPlan.name;
    }
  }, [newPlan.name]);

  const addNewWorkoutTemplate = async (title: string) => {
    newPlan.name = title;
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
    } catch (err) {
      console.error(err);
      alert("Request fehlgeschlagen");
    }
    setTempTitle("");
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setTempTitle((e.target as HTMLElement).innerText)}
          style={{
            opacity: newPlan.name === "New Workout" ? "0.4" : "",
            outline: "none",
          }}
        />
        {tempTitle !== "" && (
          <Button
            appearance="transparent"
            icon={<CheckmarkRegular color="green" />}
            onClick={() => addNewWorkoutTemplate(tempTitle)}
          />
        )}
      </div>
      <hr style={{ margin: "25px" }} />
      <TemplateExercises />
    </>
  );
}
