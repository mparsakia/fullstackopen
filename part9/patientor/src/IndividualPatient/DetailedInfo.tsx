import React from 'react';
import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from '../types';
import HealthRatingBar from '../components/HealthRatingBar';

const DetailedInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryPage {...entry} />;
    case 'HealthCheck':
      return <HealthCheckPage {...entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcarePage {...entry} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryPage = (entry: HospitalEntry) => {
  return (
    <p>
      Hospital Entry: &nbsp;
      {entry.discharge.date} {entry.discharge.criteria}
    </p>
  );
};

const HealthCheckPage = (entry: HealthCheckEntry) => {
  return (
    <div>
      <span>Health Checkup Entry</span>
      <HealthRatingBar showText={true} rating={entry.healthCheckRating} />
    </div>
  );
};

const OccupationalHealthcarePage = (entry: OccupationalHealthcareEntry) => {
  return (
    <div>
      <p>Occupational Health Entry</p>
      {entry.sickLeave ? (
        <p>
          Sick Leave Start: {entry.sickLeave?.startDate} <br></br>
          Sick Leave End: {entry.sickLeave?.endDate}
        </p>
      ) : null}
      <p>
        Employer: {entry.employerName}
        <br></br>
        Specialist: {entry.specialist}
      </p>
    </div>
  );
};

export default DetailedInfo;
