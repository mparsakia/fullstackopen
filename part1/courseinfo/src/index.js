import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props);
  return (
    <div><h1>{props.course}</h1></div>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
        <Part name={props.parts[0].name} exercise={props.parts[0].exercises}/> 
        <Part name={props.parts[1].name} exercise={props.parts[1].exercises}/> 
        <Part name={props.parts[2].name} exercise={props.parts[2].exercises}/> 
    </div>
  )
}

const Total = (props) => {
  const total = (props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises);
  return (
      <p>Number of exercises {total}</p>
  )
}

const Part = (props) => {
  return (
      <p>{props.name} {props.exercise}</p>
  )
}



const App = () => { 
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))