import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Setup
const app = express();
app.use(cors());
app.use(express.json());

// Speicherpfad
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.txt");

// Beispiel-Pläne
const PLANS: { [key: string]: string[] } = {
  "Push A": ["Bankdrücken", "Schulterdrücken", "Trizepsdrücken"],
  "Pull B": ["Klimmzüge", "LH-Rudern", "Face Pulls", "Shrugs"],
  "Legs A": ["Kniebeugen", "Beinpresse", "Beincurls", "Wadenheben"],
};

// Stelle sicher, dass Ordner + Datei existieren
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "");

// 🔹 GET: Pläne + Übungen
app.get("/api/plans", (_req: Request, res: Response) => {
  res.json({ plans: Object.keys(PLANS), exercisesByPlan: PLANS });
});

// 🔹 GET: Logs (optional mit ?date=YYYY-MM-DD)
app.get("/api/logs", (req: Request, res: Response) => {
  const dateFilter = (req.query.date as string | undefined)?.trim();
  const content = fs.readFileSync(DB_FILE, "utf-8");
  const lines = content.split("\n").filter(Boolean);
  const logs = lines.map((line) => JSON.parse(line));

  const filtered = dateFilter
    ? logs.filter((l: any) => l.date === dateFilter)
    : logs;
  res.json({ logs: filtered });
});

// 🔹 POST: Training speichern
app.post("/api/logs", (req: Request, res: Response) => {
  const { date, split, entries } = req.body || {};
  if (!date || !split || !Array.isArray(entries)) {
    return res.status(400).json({ error: "date, split, entries erforderlich" });
  }

  const allowed = new Set(PLANS[split] || []);
  const bad = entries.find((e: any) => !allowed.has(e.exercise));
  if (bad) {
    return res
      .status(400)
      .json({ error: `Übung nicht im Plan: ${bad.exercise}` });
  }

  const record = {
    id: Date.now().toString(),
    date,
    split,
    entries,
    savedAt: new Date().toISOString(),
  };

  fs.appendFileSync(DB_FILE, JSON.stringify(record) + "\n", "utf-8");
  res.json({ ok: true, record });
});

// Server starten
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ API läuft auf http://localhost:${PORT}`)
);
