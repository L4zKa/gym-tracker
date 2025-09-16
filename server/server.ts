import express from "express";
import cors from "cors";
import db from "./data/db";

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
app.get("/api/plans", (_req, res) => {
  res.json({ plans: Object.keys(PLANS), exercisesByPlan: PLANS });
});

// GET: Logs
app.get("/api/logs", (req, res) => {
  const dateFilter = req.query.date as string | undefined;

  let rows;
  if (dateFilter) {
    rows = db
      .prepare("SELECT * FROM logs WHERE date = ? ORDER BY created_at DESC")
      .all(dateFilter);
  } else {
    rows = db.prepare("SELECT * FROM logs ORDER BY created_at DESC").all();
  }

  res.json({ logs: rows });
});

// POST: Training speichern
app.post("/api/logs", (req, res) => {
  const { date, split, entries } = req.body;
  if (!date || !split || !Array.isArray(entries)) {
    return res.status(400).json({ error: "date, split, entries erforderlich" });
  }

  const insert = db.prepare(`
    INSERT INTO logs (date, split, exercise, weight, reps, notes)
    VALUES (@date, @split, @exercise, @weight, @reps, @notes)
  `);

  const tx = db.transaction((entries: any[]) => {
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
