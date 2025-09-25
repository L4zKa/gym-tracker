import { useState } from "react";
import { API_URL } from "../../helpers/API";
import type { Trainingstag, TrainingstagUebung } from "../../../../types";

export default function Days() {
  const [response, setResponse] = useState<any>(null);
  // === TRAINING ===
  const getTrainingDays = async () => {
    const res = await fetch(`${API_URL}/training`);
    const data: Trainingstag[] = await res.json();
    console.log("Trainingstage:", data);
    setResponse(data);
  };

  const addTrainingDay = async () => {
    const res = await fetch(`${API_URL}/training`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datum: new Date().toISOString().split("T")[0],
        plan_id: 1, // optional
      }),
    });
    const data: Trainingstag = await res.json();
    console.log("Neuer Trainingstag:", data);
    setResponse(data);
  };

  const addExerciseToTraining = async () => {
    const res = await fetch(`${API_URL}/training/1/uebung`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uebung_id: 1,
        saetze: 3,
        wiederholungen: 10,
        gewicht: 60,
      }),
    });
    const data: TrainingstagUebung = await res.json();
    console.log("Übung zu Trainingstag:", data);
    setResponse(data);
  };
  return (
    <div>
      <h1>Days</h1>
    </div>
  );
}
