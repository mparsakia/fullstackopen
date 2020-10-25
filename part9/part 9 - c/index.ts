import express from "express";
import patientRouter from "./src/routes/patientRouters";
import diagnosisRouter from "./src/routes/diagnosisRouter";
const app = express();
import cors from "cors";
const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("request at /api/ping");
  res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
