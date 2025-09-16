import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "gym.db");
const db = new Database(DB_PATH);

db.prepare(
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
).run();

export default db;
