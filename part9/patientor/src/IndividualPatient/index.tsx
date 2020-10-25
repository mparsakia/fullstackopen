import React from 'react';
import { useParams } from 'react-router-dom';

import { useStateValue, setPatient } from '../state';
import { Patient, Entry } from '../types';
import { getPatient } from '../services/patientService';
import DetailedInfo from './DetailedInfo';

const entryStyle = {
  backgroundColor: 'honeydew',
  padding: '10px',
  border: '1px solid black',
  margin: '10px 0px',
};

const IndividualPatient: React.FC = () => {
  const idState = useParams<{ id: string }>();
  const idString = idState.id.toString();
  const [stateUpdate, updateState] = React.useState('');
  const [{ patientState, diagnosisCodes }, dispatch] = useStateValue();

  console.log('patientState.id:', patientState?.id);
  console.log('idString:', idString);

  if (patientState?.id !== idString) {
    getPatient(idString).then((patient: Patient) => {
      dispatch(setPatient(patient));
      updateState(patient.id);
    });
  }

  console.log('patientState after dispatch:', patientState);

  if (!patientState) {
    return <h1>error, patient not in state/database</h1>;
  }

  return (
    <div>
      <h2>{patientState.name}</h2>
      <p>
        gender: <b>{patientState.gender}</b>
      </p>
      <p>
        ssn: <b>{patientState.ssn}</b>
      </p>
      <p>
        occupation: <b>{patientState.occupation}</b>
      </p>
      <h3>Entries</h3>
      {Object.values(patientState.entries).map((entry: Entry) => (
        <div style={entryStyle} key={entry.id}>
          <h3>Entry Date: {entry.date}</h3>
          <b>Entry Description: {entry.description}</b>
          <DetailedInfo entry={entry} />
          {entry.diagnosisCodes
            ? Object.values(
                entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    Diagnosis Code: {code} — &nbsp;
                    {diagnosisCodes[code]?.name}
                  </li>
                ))
              )
            : null}
        </div>
      ))}
      <hr></hr>
      <br></br>
      ----debugging log----<br></br>
      <small>patient id: {idString}</small>
      <br></br>
      <br></br>
      <small>patient state: {JSON.stringify(patientState)}</small>
      <br></br>
      <br></br>
      <small>stateUpdate state: {JSON.stringify(stateUpdate)}</small>
    </div>
  );
};

export default IndividualPatient;
