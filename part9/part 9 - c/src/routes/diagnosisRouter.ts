import express from "express";
import diagnosisService from "../services/diagnosisService";
const router = express.Router();

// all requests here to "/" are actually "/api/diagnoses"
// we define the path in index.ts

router.get("/", (_req, res) => {
  console.log("GET request at /api/diagnoses.");
  res.send(diagnosisService.getEntries());
});

router.post("/", (_req, _res) => {
  console.log("POST request at /api/diagnoses.");
});

export default router;
