import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Statpart = ({ text, value }) => {
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = ({ statobj }) => {
  var flag = true; // Flag is true when there is no input.
  if (statobj.g != 0) { flag = false }  // Check if any input was given, if so, change flag state
  if (statobj.n != 0) { flag = false }
  if (statobj.b != 0) { flag = false }

  // use flag to check if which output we display
  if (flag == false) {
    return (
      <div>
        <h1>Statistics</h1>
        <Statpart text="Good" value={statobj.g} />
        <Statpart text="Neutral" value={statobj.n} />
        <Statpart text="Bad" value={statobj.b} />
        <Statpart text="All" value={statobj.g + statobj.n + statobj.b} />
        <Statpart text="Avg" value={(statobj.g + (-statobj.b)) / (statobj.g + statobj.b + statobj.n)} />
        <Statpart text="Positive" value={((statobj.g) / (statobj.g + statobj.b + statobj.n) * 100.0)} />
      </div>
    )
  }
  else {
    return (
      <p>No feedback recieved yet.</p>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  var statobj = { g: good, n: neutral, b: bad };

  return (
    <div>
      <h1>Give feedback:</h1>
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>


      <Statistics statobj={statobj} />

    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)