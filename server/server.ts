import express from "express";
import cors from "cors";

import templatesRoutes from "./routes/templates";
import templateExercisesRoutes from "./routes/templateExercises";
import trainingDaysRoutes from "./routes/trainingDays";
import trainingExercisesRoutes from "./routes/trainingExercises";

// import weitere Routes hier

const app = express();
app.use(cors());
app.use(express.json());

// Prefix für jede Route
app.use("/api/templates", templatesRoutes);
app.use("/api/template-exercises", templateExercisesRoutes);
app.use("/api/training-days", trainingDaysRoutes);
app.use("/api/training-exercises", trainingExercisesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API läuft auf http://localhost:${PORT}`);
});
