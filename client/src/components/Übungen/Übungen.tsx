import { useState } from "react";
import { API_URL } from "../../helpers/API";
import type { Uebung } from "../../../../types";

export default function Übungen() {
  const [newExercise, setNewExercise] = useState<Uebung>();
  const [allExercises, setAllExercises] = useState<Uebung[]>();
  // === ÜBUNGEN ===
  const getExercises = async () => {
    const res = await fetch(`${API_URL}/uebungen`);
    const data: Uebung[] = await res.json();
    console.log("Übungen:", data);
    setAllExercises(data);
  };

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
  return <div></div>;
}
