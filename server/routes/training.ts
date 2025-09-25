import { Router } from "express";
import db from "../db";

const router = Router();

// Trainingstage abrufen
router.get("/", (req, res) => {
  db.all("SELECT * FROM trainingstage", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Trainingstag erstellen
router.post("/", (req, res) => {
  const { datum, plan_id } = req.body;
  db.run(
    "INSERT INTO trainingstage (datum, plan_id) VALUES (?, ?)",
    [datum, plan_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, datum, plan_id });
    }
  );
});

// Übung zu Trainingstag hinzufügen
router.post("/:id/uebung", (req, res) => {
  const trainingstag_id = req.params.id;
  const { uebung_id, saetze, wiederholungen, gewicht } = req.body;

  db.run(
    "INSERT INTO trainingstage_uebungen (trainingstag_id, uebung_id, saetze, wiederholungen, gewicht) VALUES (?, ?, ?, ?, ?)",
    [trainingstag_id, uebung_id, saetze, wiederholungen, gewicht],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        trainingstag_id,
        uebung_id,
        saetze,
        wiederholungen,
        gewicht,
      });
    }
  );
});

export default router;
