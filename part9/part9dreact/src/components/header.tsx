import React from 'react';

const Header: React.FC<{ course: string }> = ({ course }) => {
  console.log(course);
  return <h1>{course}</h1>;
};

export default Header;
