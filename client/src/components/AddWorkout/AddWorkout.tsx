import {
  Dropdown,
  Input,
  Text,
  Option,
  Button,
  Subtitle2,
} from "@fluentui/react-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { API } from "../../helpers/API";

type PlansResponse = {
  plans: string[];
  exercisesByPlan: Record<string, string[]>;
};
type Entry = {
  exercise: string;
  weight: number | "";
  reps: number | "";
  notes?: string;
};
export default function AddWorkout() {
  const [exByPlan, setExByPlan] = useState<Record<string, string[]>>({});

  const [split, setSplit] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [plans, setPlans] = useState<string[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  // Pläne laden
  useEffect(() => {
    fetch(`${API}/workoutplans`)
      .then((r) => r.json())
      .then((data: PlansResponse) => {
        setPlans(data.plans);
        setExByPlan(data.exercisesByPlan);
        if (data.plans.length && !split) setSplit(data.plans[0]);
      })
      .catch(() => setMessage("❌ Konnte Pläne nicht laden"));
  }, []);
  // Übungen beim Split-Wechsel initialisieren
  useEffect(() => {
    if (!split) return;
    const exercises = exByPlan[split] || [];
    setEntries(
      exercises.map((e) => ({ exercise: e, weight: "", reps: "", notes: "" }))
    );
  }, [split, exByPlan]);

  const canSave = useMemo(
    () =>
      !!date &&
      !!split &&
      entries.length > 0 &&
      entries.some((e) => e.weight !== "" && e.reps !== ""),
    [date, split, entries]
  );

  const updateEntry = useCallback((idx: number, patch: Partial<Entry>) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, ...patch } : e))
    );
  }, []);

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
      if (!res.ok) throw new Error("Speichern fehlgeschlagen");
      setMessage("✅ Gespeichert");
    } catch (e: any) {
      setMessage("❌ " + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h1>Add Workout</h1>
      {/* Kopfzeile */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <Text block>Datum</Text>
          <Input
            type="date"
            value={date}
            onChange={(_, data) => setDate(data.value)}
          />
        </div>

        <div style={{ flex: 1 }}>
          <Text block>Split</Text>
          <Dropdown
            placeholder="Split auswählen"
            selectedOptions={split ? [split] : []}
            onOptionSelect={(_, data) => setSplit(data.optionValue as string)}
          >
            {plans.map((p) => (
              <Option key={p} value={p}>
                {p}
              </Option>
            ))}
          </Dropdown>
        </div>

        <Button
          appearance="primary"
          disabled={!canSave || saving}
          onClick={save}
        >
          {saving ? "Speichern…" : "Speichern"}
        </Button>
      </div>
      <Subtitle2>Übungen für: {split || "—"}</Subtitle2>
      {/* Schlichte HTML-Tabelle, aber mit Fluent-Inputs */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          cellPadding={8}
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
                  <Input
                    type="number"
                    value={e.weight === "" ? "" : String(e.weight)}
                    onChange={(_, data) =>
                      updateEntry(i, {
                        weight: data.value === "" ? "" : Number(data.value),
                      })
                    }
                  />
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    textAlign: "center",
                  }}
                >
                  <Input
                    type="number"
                    value={e.reps === "" ? "" : String(e.reps)}
                    onChange={(_, data) =>
                      updateEntry(i, {
                        reps: data.value === "" ? "" : Number(data.value),
                      })
                    }
                  />
                </td>
                <td style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <Input
                    type="text"
                    value={e.notes ?? ""}
                    placeholder="optional"
                    onChange={(_, data) =>
                      updateEntry(i, { notes: data.value })
                    }
                  />
                </td>
              </tr>
            ))}
            {!entries.length && (
              <tr>
                <td colSpan={4}>
                  <i>Keine Übungen für diesen Split.</i>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!!message && (
        <Text style={{ marginTop: 12 }} block>
          {message}
        </Text>
      )}
    </>
  );
}
