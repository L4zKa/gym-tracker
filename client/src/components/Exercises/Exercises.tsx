import { useState } from "react";
import { API_URL } from "../../helpers/API";
import type { Uebung } from "../../../../types";
import AllExercises from "./AllExercises";
import { AddRegular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import "../../frogtheme.css";

export default function Exercises() {
  const [newExercise, setNewExercise] = useState<Uebung>();
  // === ÜBUNGEN ===

  const addExercise = async () => {
    const res = await fetch(`${API_URL}/uebungen`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bankdrücken",
        beschreibung: "Flachbank mit Langhantel",
        muskelgruppe: "Brust",
      }),
    });
    const data: Uebung = await res.json();
    console.log("Neue Übung:", data);
    setNewExercise(data);
  };
  return (
    <div>
      <h1 className="frog-heading">Exercises</h1>
      <Button onClick={() => addExercise()} icon={<AddRegular />}>
        Add Exercise
      </Button>
      <AllExercises />
    </div>
  );
}
