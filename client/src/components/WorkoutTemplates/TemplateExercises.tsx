import { Button, Input, Label } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import React, { useState } from "react";

export default function TemplateExercises() {
  const [exercises, setExercises] = useState<string[]>(["Bankdrücken", "Kniebeugen"]);
  const [newExercise, setNewExercise] = useState("");

  const addExercise = () => {
    if (!newExercise.trim()) return;
    setExercises([...exercises, newExercise]);
    setNewExercise("");
  };

  const removeExercise = (name: string) => {
    setExercises(exercises.filter((ex) => ex !== name));
  };

  return (
    <>
      <h2 style={{ marginBottom: "0.5rem" }}>Übungen</h2>

      <ul style={{ padding: 0, margin: "0 0 1rem 0", listStyle: "none" }}>
        {exercises.map((ex) => (
          <li
            key={ex}
            style={{
              display: "flex",
              /* justifyContent: "space-between", */
              alignItems: "center",
              borderTop: "1px solid",
              padding: "15px",
            }}
          >
            <Button
              onClick={() => removeExercise(ex)}
              icon={<DismissRegular />}
              appearance="transparent"
            />
            <Label size="large">{ex}</Label>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Input
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
          placeholder="Neue Übung..."
        />
        <Button onClick={addExercise}>Hinzufügen</Button>
      </div>
    </>
  );
}
