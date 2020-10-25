import React from 'react';
import Part from './part';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: 'Fundamentals';
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <div>
    {courseParts.map((part) => {
      switch (part.name) {
        case 'Fundamentals':
          return <Part part={part} key={part.name} />;
        case 'Using props to pass data':
          return <Part part={part} key={part.name} />;
        case 'Deeper type usage':
          return <Part part={part} key={part.name} />;
        default:
          return assertNever(part);
      }
    })}
  </div>
);

export default Content;

// https://stackoverflow.com/questions/57876506/typescript-types-for-react-component-where-prop-is-an-array-of-objects
