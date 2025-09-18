import { Router } from "express";
import { db } from "../db";

const router = Router();

// alle Templates
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM training_day_templates").all();
  res.json(rows);
});

// neues Template
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name fehlt" });

  const result = db
    .prepare("INSERT INTO training_day_templates (name) VALUES (?)")
    .run(name);

  res.json({ id: result.lastInsertRowid, name });
});

export default router;
