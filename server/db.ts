import path from "path";
import Database from "better-sqlite3";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "workout.db");
export const db = new Database(DB_PATH);
db.pragma("foreign_keys = ON");

// Tabellen erstellen (wie oben gezeigt)
db.exec(`
CREATE TABLE IF NOT EXISTS training_day_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS template_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  default_weight REAL,
  default_reps INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES training_day_templates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS training_days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  template_id INTEGER,      -- optional, auf welchem Template basiert
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES training_day_templates(id)
);

CREATE TABLE IF NOT EXISTS training_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  training_day_id INTEGER NOT NULL,
  name TEXT NOT NULL,      
  weight REAL,
  reps INTEGER,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (training_day_id) REFERENCES training_days(id) ON DELETE CASCADE
);
`);
