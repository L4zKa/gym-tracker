import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";

const WORKOUTDAY_PATH = path.join(process.cwd(), "data", "workoutday.db");
const workoutDayDb = new Database(WORKOUTDAY_PATH);
workoutDayDb
  .prepare(
    `
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    split TEXT NOT NULL,
    exercise TEXT NOT NULL,
    weight REAL,
    reps INTEGER,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`
  )
  .run();

const SPLITPLAN_PATH = path.join(process.cwd(), "data", "workoutplans.db");

const app = express();
app.use(cors());
app.use(express.json());

// Beispiel-Pläne
const PLANS: { [key: string]: string[] } = {
  "Push A": ["Bankdrücken", "Schulterdrücken", "Trizepsdrücken"],
  "Pull B": ["Klimmzüge", "LH-Rudern", "Face Pulls", "Shrugs"],
  "Legs A": ["Kniebeugen", "Beinpresse", "Beincurls", "Wadenheben"],
};

// GET: Pläne
app.get("/api/workoutplans", (_req, res) => {
  console.log();
  res.json({ plans: Object.keys(PLANS), exercisesByPlan: PLANS });
});

// GET: Logs
app.get("/api/workoutdays", (req, res) => {
  const dateFilter = req.query.date as string | undefined;

  let rows;
  if (dateFilter) {
    rows = workoutDayDb
      .prepare("SELECT * FROM logs WHERE date = ? ORDER BY created_at DESC")
      .all(dateFilter);
  } else {
    rows = workoutDayDb
      .prepare("SELECT * FROM logs ORDER BY created_at DESC")
      .all();
  }

  res.json({ logs: rows });
});

// POST: Training speichern
app.post("/api/logs", (req, res) => {
  const { date, split, entries } = req.body;
  if (!date || !split || !Array.isArray(entries)) {
    return res.status(400).json({ error: "date, split, entries erforderlich" });
  }

  const insert = workoutDayDb.prepare(`
    INSERT INTO logs (date, split, exercise, weight, reps, notes)
    VALUES (@date, @split, @exercise, @weight, @reps, @notes)
  `);

  const tx = workoutDayDb.transaction((entries: any[]) => {
    for (const e of entries) {
      insert.run({
        date,
        split,
        exercise: e.exercise,
        weight: e.weight || null,
        reps: e.reps || null,
        notes: e.notes || null,
      });
    }
  });

  tx(entries);

  res.json({ ok: true });
});

// Server starten
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ API läuft auf http://localhost:${PORT}`)
);
