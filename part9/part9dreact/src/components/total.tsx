import React from 'react';

interface Props {
  entry: {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
  }[];
}

const Total: React.FC<Props> = (props) => {
  console.log('total clog', props);
  return (
    <b>
      Total parts: &nbsp;
      {props.entry.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </b>
  );
};

export default Total;
