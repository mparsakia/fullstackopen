import React from 'react';
import ReactDOM from 'react-dom';

// Note to self: if you forget what is getting passed in, use props and
// immedeatley console.log it, then you will know what to destructure/refactor to.
// i.e, if it was props being passed in below put console.log("HeaderProps:", props) right after decl.
const Header = ({course}) => {
  return (
      <div>
          <h3>{course}</h3>
      </div>
  )
}

// Reduce all the "exercises" (numbers) to one value and print it
// arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// console.log(array1.reduce(reducer)); 
const Total = ({parts}) => {

  const totalAmount = parts.reduce(function(total, part) {
      return total +  part.exercises;
  }, 0) // 0 is for initial value, so it doesnt print Object object, instead will print the number
  
  return (
      <div>
          <b>total of {totalAmount} exercises</b>
      </div>
  )
}

const Content = ({parts}) => {
  return (
      <div>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
  )       
}

const Course = ({course}) => {
// Course will just be a sort of 'interface' for Header, Content, and Total JSX 'calls' 
  return (
      <div>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
      </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

//  console.log("App-Courses-Props: ", courses);


  return (
      <div>
          <h1>FullStackOpen Assignment Parts 2.1-2.5</h1>
          {
            courses.map((courseobj) => {
              return <Course key={courseobj.id} course={courseobj} /> 
            })
          }
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// As stated in the chapter, we must pass key when iterating with map to generate JSX objects from an array
// So instead we will use courseobj to make it clear.
// Now map will go through our entire array and generate JSX for each obj in the array 'courses'
// We also will not use the courseobj as key to loop over: instead
// Instead we will use the id datafield of the object to keep track where we are





 



