import React, { useEffect, useMemo, useState } from "react";
import LogsViewer from "./components/LogsViewer";
import { API } from "./helpers/API";

type PlanName = string;
type ExerciseName = string;

type PlansResponse = {
  plans: PlanName[];
  exercisesByPlan: Record<PlanName, ExerciseName[]>;
};

type Entry = {
  exercise: string;
  weight: number | "";
  reps: number | "";
  notes?: string;
};

export default function App() {
  const [plans, setPlans] = useState<PlanName[]>([]);
  const [exByPlan, setExByPlan] = useState<Record<PlanName, ExerciseName[]>>(
    {}
  );
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [split, setSplit] = useState<PlanName>("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch(`${API}/plans`)
      .then((r) => r.json())
      .then((data: PlansResponse) => {
        setPlans(data.plans);
        setExByPlan(data.exercisesByPlan);
        if (data.plans.length && !split) setSplit(data.plans[0]);
      })
      .catch(() => setMessage("Konnte Pläne nicht laden"));
  }, []);

  // Wenn Split wechselt → Einträge neu initialisieren mit Übungen des Splits
  useEffect(() => {
    if (!split) return;
    const exercises = exByPlan[split] || [];
    setEntries(
      exercises.map((e) => ({ exercise: e, weight: "", reps: "", notes: "" }))
    );
  }, [split, exByPlan]);

  const canSave = useMemo(() => {
    if (!date || !split || !entries.length) return false;
    // Mindestens eine Übung mit Zahlen
    return entries.some((e) => e.weight !== "" && e.reps !== "");
  }, [date, split, entries]);

  const updateEntry = (idx: number, patch: Partial<Entry>) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, ...patch } : e))
    );
  };

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        date,
        split,
        entries: entries
          .filter(
            (e) =>
              e.weight !== "" || e.reps !== "" || (e.notes ?? "").trim() !== ""
          )
          .map((e) => ({
            exercise: e.exercise,
            weight: e.weight === "" ? 0 : Number(e.weight),
            reps: e.reps === "" ? 0 : Number(e.reps),
            notes: (e.notes ?? "").trim() || undefined,
          })),
      };
      const res = await fetch(`${API}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Speichern fehlgeschlagen");
      }
      setMessage("✅ Gespeichert (in data/db.txt)");
    } catch (e: any) {
      setMessage("❌ " + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
      <h1>Gym Tracker (Date → Split → Übungen → Save to .txt)</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <label>
          <div>Datum</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          <div>Split</div>
          <select value={split} onChange={(e) => setSplit(e.target.value)}>
            {plans.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <button
          disabled={!canSave || saving}
          onClick={save}
          style={{ alignSelf: "end", height: 38 }}
        >
          {saving ? "Speichern…" : "Speichern"}
        </button>
      </section>

      <h2>Übungen für: {split || "—"}</h2>
      <div style={{ overflowX: "auto" }}>
        <table
          cellPadding={8}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                Übung
              </th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Gewicht (kg)</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Wdh</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                Notizen
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={e.exercise}>
                <td style={{ borderBottom: "1px solid #f0f0f0" }}>
                  {e.exercise}
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="number"
                    inputMode="decimal"
                    value={e.weight}
                    onChange={(ev) =>
                      updateEntry(i, {
                        weight:
                          ev.target.value === "" ? "" : Number(ev.target.value),
                      })
                    }
                    style={{ width: 100 }}
                  />
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="number"
                    inputMode="numeric"
                    value={e.reps}
                    onChange={(ev) =>
                      updateEntry(i, {
                        reps:
                          ev.target.value === "" ? "" : Number(ev.target.value),
                      })
                    }
                    style={{ width: 80 }}
                  />
                </td>
                <td style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <input
                    type="text"
                    value={e.notes ?? ""}
                    onChange={(ev) =>
                      updateEntry(i, { notes: ev.target.value })
                    }
                    style={{ width: "100%" }}
                    placeholder="optional"
                  />
                </td>
              </tr>
            ))}
            {!entries.length && (
              <tr>
                <td colSpan={4}>Keine Übungen für diesen Split.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!!message && <p style={{ marginTop: 12 }}>{message}</p>}

      <hr style={{ margin: "24px 0" }} />

      <LogsViewer />
    </div>
  );
}
