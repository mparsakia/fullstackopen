import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils/utilities';
const router = express.Router();

// all requests here to "/" are actually "/api/patients"
// we define the path in index.ts

router.get('/', (_req, res) => {
  console.log('GET request at /api/patients.');
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (_req, res) => {
  console.log('GET request at /api/patients/:id');
  const id = _req.params.id;
  res.send(patientService.getByID(id));
});

router.post('/', (req, res) => {
  console.log('POST request at /api/patients.');
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const result = patientService.addEntry(newPatientEntry);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
