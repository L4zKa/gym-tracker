import React, { useEffect, useMemo, useState, useCallback } from "react";
import LogsViewer from "./components/LogsViewer";
import { API } from "./helpers/API";
import {
  Button,
  Dropdown,
  FluentProvider,
  Input,
  Option,
  Subtitle1,
  Subtitle2,
  teamsDarkTheme,
  Text,
  webLightTheme,
} from "@fluentui/react-components";
import { WeatherSunnyRegular } from "@fluentui/react-icons";
import TrackerIcon from "../icons/TrackerIcon";
import "./App.css";

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
  const [isThemeDark, setIsThemeDark] = useState<boolean>(false);
  const [plans, setPlans] = useState<PlanName[]>([]);
  const [exByPlan, setExByPlan] = useState<Record<PlanName, ExerciseName[]>>(
    {}
  );
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [split, setSplit] = useState<PlanName>("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Theme beim Start aus LocalStorage wiederherstellen
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsThemeDark(true);
  }, []);

  // Body-Klasse immer synchron zum State halten (keine toggle-Rennen)
  useEffect(() => {
    if (isThemeDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isThemeDark]);

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

  const toggleTheme = () => {
    const newThemeIsDark = !isThemeDark;
    setIsThemeDark(newThemeIsDark);
    localStorage.setItem("theme", newThemeIsDark ? "dark" : "white");
  };

  return (
    <FluentProvider
      theme={isThemeDark ? teamsDarkTheme : webLightTheme}
      style={{ padding: "2rem", background: "#ffffff00" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Subtitle1 style={{ display: "flex", alignItems: "center" }}>
          <TrackerIcon height={32} width={32} style={{ marginRight: "5px" }} />
          Gym Tracker
        </Subtitle1>

        <Button
          onClick={toggleTheme}
          size="large"
          icon={<WeatherSunnyRegular className="spinButton" />}
          appearance="transparent"
          aria-label="Theme wechseln"
        />
      </div>

      <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
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
                <th
                  style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                >
                  Übung
                </th>
                <th style={{ borderBottom: "1px solid #ddd" }}>Gewicht (kg)</th>
                <th style={{ borderBottom: "1px solid #ddd" }}>Wdh</th>
                <th
                  style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}
                >
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

        <hr style={{ margin: "24px 0" }} />

        <LogsViewer />
      </div>
    </FluentProvider>
  );
}
