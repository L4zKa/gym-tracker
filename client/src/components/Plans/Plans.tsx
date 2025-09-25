import { useState } from "react";
import { API_URL } from "../../helpers/API";
import type { Plan, PlanUebung } from "../../../../types";

export default function Plans() {
  const [response, setResponse] = useState<any>(null);

  // === PLÄNE ===
  const getPlans = async () => {
    const res = await fetch(`${API_URL}/plaene`);
    const data: Plan = await res.json();
    console.log("Pläne:", data);
    setResponse(data);
  };

  const addPlan = async () => {
    const res = await fetch(`${API_URL}/plaene`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Push Day",
        beschreibung: "Drückübungen",
        uebungen: [
          { uebung_id: 1, saetze: 4, wiederholungen: 8 },
          { uebung_id: 2, saetze: 3, wiederholungen: 12 },
        ],
      }),
    });
    const data: Plan = await res.json();
    console.log("Neuer Plan:", data);
    setResponse(data);
  };
  return (
    <div>
      <h1>Plans</h1>
    </div>
  );
}
