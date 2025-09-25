import express from "express";
import bodyParser from "body-parser";
import exercisesRoutes from "./routes/exercises";
import plansRoutes from "./routes/plans";
import trainingRoutes from "./routes/training";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routen
app.use("/api/uebungen", exercisesRoutes);
app.use("/api/plaene", plansRoutes);
app.use("/api/training", trainingRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
