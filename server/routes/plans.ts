import { Router } from "express";
import db from "../db";

const router = Router();

// Alle Pläne abrufen
router.post("/", (req, res) => {
  const { name, beschreibung, uebungen } = req.body;

  db.run(
    "INSERT INTO plaene (name, beschreibung) VALUES (?, ?)",
    [name, beschreibung],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const planId = this.lastID;

      if (uebungen && uebungen.length > 0) {
        const stmt = db.prepare(
          "INSERT INTO plan_uebungen (plan_id, uebung_id, saetze, wiederholungen) VALUES (?, ?, ?, ?)"
        );

        uebungen.forEach(
          (ueb: {
            uebung_id: number;
            saetze?: number;
            wiederholungen?: number;
          }) => {
            stmt.run(
              planId,
              ueb.uebung_id,
              ueb.saetze || null,
              ueb.wiederholungen || null
            );
          }
        );

        stmt.finalize();
      }

      res.json({ id: planId, name, beschreibung });
    }
  );
});

export default router;
