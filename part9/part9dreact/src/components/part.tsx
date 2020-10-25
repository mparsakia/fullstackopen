import React from 'react';

type AllParts = {
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
};

const Part: React.FC<{ part: AllParts }> = ({ part }) => {
  return (
    <div>
      <h3>
        {part.name} : {part.exerciseCount}
      </h3>
      {part.description ? (
        <div>
          {part.description}
          <br />
        </div>
      ) : null}
      {part.groupProjectCount ? (
        <div>
          Group Project Count: {part.groupProjectCount} <br />
        </div>
      ) : null}
      {part.exerciseSubmissionLink ? (
        <div>
          {part.exerciseSubmissionLink} <br />
        </div>
      ) : null}
      <hr></hr>
    </div>
  );
};

export default Part;
