import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET: alle Übungen zu einem Trainingstag
router.get("/:dayId", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM training_exercises WHERE training_day_id = ?")
    .all(req.params.dayId);
  res.json(rows);
});

// POST: neue Übung in Trainingstag
router.post("/", (req, res) => {
  const { training_day_id, name, weight, reps, notes } = req.body;
  if (!training_day_id || !name)
    return res
      .status(400)
      .json({ error: "training_day_id und name sind Pflicht" });

  const result = db
    .prepare(
      `INSERT INTO training_exercises (training_day_id, name, weight, reps, notes)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(training_day_id, name, weight ?? null, reps ?? null, notes ?? null);

  res.json({
    id: result.lastInsertRowid,
    training_day_id,
    name,
    weight,
    reps,
    notes,
  });
});
export default router;
