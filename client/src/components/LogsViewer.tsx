import { useEffect, useState } from "react";
import { API } from "../helpers/API";

export default function LogsViewer() {
  const [date, setDate] = useState<string>("");
  const [logs, setLogs] = useState<any[]>([]);
  async function load() {
    const url = date
      ? `${API}/logs?date=${encodeURIComponent(date)}`
      : `${API}/logs`;
    const res = await fetch(url);
    const data = await res.json();
    setLogs(data.logs || []);
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <h2>Gespeicherte Logs</h2>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={load}>Laden</button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {logs.map((log) => (
          <div
            key={log.id}
            style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}
          >
            <strong>
              {log.date} — {log.split}
            </strong>
            <ul style={{ margin: "8px 0 0 16px" }}>
              {log.entries.map((en: any, idx: number) => (
                <li key={idx}>
                  {en.exercise}: {en.weight} kg × {en.reps}
                  {en.notes ? ` — ${en.notes}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!logs.length && <i>Noch keine Einträge.</i>}
      </div>
    </section>
  );
}
