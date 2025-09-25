import { Router } from "express";
import db from "../db";

const router = Router();

// Alle Übungen abrufen
router.get("/", (req, res) => {
  db.all("SELECT * FROM uebungen", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Neue Übung hinzufügen
router.post("/", (req, res) => {
  const { name, beschreibung, muskelgruppe } = req.body;
  db.run(
    "INSERT INTO uebungen (name, beschreibung, muskelgruppe) VALUES (?, ?, ?)",
    [name, beschreibung, muskelgruppe],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, beschreibung, muskelgruppe });
    }
  );
});

export default router;
