import { State } from './state';
import { Patient, Diagnosis } from '../types';

type SET_PATIENT = 'SET_PATIENT';
type SET_PATIENT_LIST = 'SET_PATIENT_LIST';
type ADD_PATIENT = 'ADD_PATIENT';
type SET_DIAGNOSES_CODES = 'SET_DIAGNOSES_CODES';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient;
    }
  | {
      type: SET_DIAGNOSES_CODES;
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      state.patientState = action.payload;
      state.patientStateId = action.payload.id;
      return state;
    case 'SET_DIAGNOSES_CODES':
      console.log('action', action);
      return {
        ...state,
        diagnosisCodes: {
          ...action.payload.reduce(
            (note, diagnosis) => ({ ...note, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients,
        },
      };
    default:
      return state;
  }
};

// Adding action creater functions
export const setPatient = (patient: Patient) => {
  const T: SET_PATIENT = 'SET_PATIENT';
  return {
    type: T,
    payload: patient,
  };
};

export const setPatientList = (patientListFromApi: Patient[]) => {
  const T: SET_PATIENT_LIST = 'SET_PATIENT_LIST';
  return {
    type: T,
    payload: patientListFromApi,
  };
};

export const addPatient = (patient: Patient) => {
  const T: ADD_PATIENT = 'ADD_PATIENT';
  return {
    type: T,
    payload: patient,
  };
};

export const setDiagnosesCodes = (diagnosesCodes: Diagnosis[]) => {
  const T: SET_DIAGNOSES_CODES = 'SET_DIAGNOSES_CODES';
  return {
    type: T,
    payload: diagnosesCodes,
  };
};
