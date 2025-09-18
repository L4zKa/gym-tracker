import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET: alle Übungen zu einem Template
router.get("/:templateId", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM template_exercises WHERE template_id = ?")
    .all(req.params.templateId);
  res.json(rows);
});

// POST: neue Übung zu einem Template
router.post("/", (req, res) => {
  const { template_id, name, default_weight, default_reps } = req.body;
  if (!template_id || !name)
    return res.status(400).json({ error: "template_id und name sind Pflicht" });

  const result = db
    .prepare(
      `INSERT INTO template_exercises (template_id, name, default_weight, default_reps)
       VALUES (?, ?, ?, ?)`
    )
    .run(template_id, name, default_weight ?? null, default_reps ?? null);

  res.json({
    id: result.lastInsertRowid,
    template_id,
    name,
    default_weight,
    default_reps,
  });
});
export default router;
