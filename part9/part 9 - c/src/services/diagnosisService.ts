import diagnosisData from "../data/diagnoses.json";
import { DiagnosisEntry } from "../data/types";

const allDiagnoses: Array<DiagnosisEntry> = diagnosisData;

const getEntries = (): Array<DiagnosisEntry> => {
  return allDiagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
