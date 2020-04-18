import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  {
    msg: 'If it hurts, do it more often',
    votes: 0,
  },
  {
    msg: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  {
    msg: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  {
    msg: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  {
    msg: 'Premature optimization is the root of all evil.',
    votes: 0,
  },
  {
    msg: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  }
]


const Button = (props) => {         // console.log(props,'ButtonProps');
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const MostVoted = ({copyarr}) => {
  let popularidx = 0;
  let highest = copyarr[0]['votes'];
  for (let idx = 0; idx < copyarr.length; idx++) {
      if (highest < copyarr[idx]['votes'])  {
        highest = copyarr[idx]['votes'];
        popularidx = idx;
      }
  }
  return(
    <p>{copyarr[popularidx]['msg']}<br/>has {highest} votes</p>
  )
}

const App = (props) => {            // console.log(props,'AppProps');

  const [selected, setSelected] = useState(0)
  let rngnumber = Math.floor(Math.random() * anecdotes.length); 

  let copyarr = [...anecdotes];      // console.log(copyarr,"copyarr");


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{props.anecdotes[rngnumber]['msg']}</p>
      <div>VOTES: {copyarr[rngnumber]['votes']}</div>  
      <Button handleClick={() => setSelected(selected + 1)} text="Get Random Anecdote" />
      <Button handleClick={() => copyarr[rngnumber]['votes'] += 1} text="Vote +1" />
      <h2>Anecdote with most votes</h2>
      <MostVoted copyarr={copyarr} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)  