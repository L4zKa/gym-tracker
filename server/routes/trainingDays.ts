import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET: alle Trainingstage
router.get("/", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM training_days ORDER BY date DESC")
    .all();
  res.json(rows);
});

// POST: neuen Trainingstag anlegen
router.post("/", (req, res) => {
  const { date, template_id, notes } = req.body;
  if (!date) return res.status(400).json({ error: "date fehlt" });

  const result = db
    .prepare(
      "INSERT INTO training_days (date, template_id, notes) VALUES (?, ?, ?)"
    )
    .run(date, template_id ?? null, notes ?? null);

  res.json({
    id: result.lastInsertRowid,
    date,
    template_id,
    notes,
  });
});

export default router;
