import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "data", "gymtracker.db");
const db = new sqlite3.Database(dbPath);

// Tabellen anlegen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS uebungen (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      beschreibung TEXT,
      muskelgruppe TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS plaene (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      beschreibung TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS plan_uebungen (
    plan_id INTEGER,
    uebung_id INTEGER,
    saetze INTEGER,
    wiederholungen INTEGER,
    PRIMARY KEY (plan_id, uebung_id),
    FOREIGN KEY (plan_id) REFERENCES plaene(id),
    FOREIGN KEY (uebung_id) REFERENCES uebungen(id)
  )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS trainingstage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      datum TEXT NOT NULL,
      plan_id INTEGER,
      FOREIGN KEY (plan_id) REFERENCES plaene(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS trainingstage_uebungen (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trainingstag_id INTEGER NOT NULL,
      uebung_id INTEGER NOT NULL,
      saetze INTEGER,
      wiederholungen INTEGER,
      gewicht REAL,
      FOREIGN KEY (trainingstag_id) REFERENCES trainingstage(id),
      FOREIGN KEY (uebung_id) REFERENCES uebungen(id)
    )
  `);
});

export default db;
