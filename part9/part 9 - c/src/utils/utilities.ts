/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry } from '../data/types';
import { Gender } from '../data/types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string: any): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing value: ' + string);
  }
  return string;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    ssn: parseString(object.ssn),
    entries: [],
  };
  return newPatient;
};
