import patientData from '../data/patients';
import { NewPatientEntry, PatientEntry, PublicPatient } from '../data/types';
import { toNewPatientEntry } from '../utils/utilities';
import { v4 as uuidv4 } from 'uuid';

const allPatients: PatientEntry[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<PatientEntry> => {
  return patientData;
};

const getByID = (id: string): PatientEntry | undefined => {
  return patientData.find((patient) => patient.id === id);
};

// we need to exclude the field ourselves even with the custom type...
const getNonSensitiveEntries = (): PublicPatient[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id: id,
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation,
  }));
};

const addEntry = (newobj: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    name: newobj.name,
    dateOfBirth: newobj.dateOfBirth,
    gender: newobj.gender,
    occupation: newobj.occupation,
    ssn: newobj.ssn,
    entries: [],
  };

  allPatients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  getByID,
  getNonSensitiveEntries,
};
