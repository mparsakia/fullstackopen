// FullStackOpen Ex. 2.11 extends phonebook

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


const Filter = (props) => (
  <p>
    Filter by Name: <input value={props.filter} onChange={props.handleFilter} />
  </p>
)


const Display = (props) => (
  <div>
    {props.entry.map(ent => <PhoneBookEntry key={ent.name} entry={ent} />)}
  </div>
)

const AddPerson = (props) => (
  <div>
    <h2>add new entry:</h2>
    <form onSubmit={props.addPerson}>
      <div>name: <input value={props.newName} onChange={props.handleNameChange} /> </div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button type="submit">add to phonebook</button></div>
    </form>
  </div>
)

const PhoneBookEntry = (props) => {
  console.log("From PBE", props)
  return (
    <p>
      <li>{props.entry.name}</li>
      <li>{props.entry.number}</li>
    </p>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState([])  // this time populated with useEffect and axios
  const [newName, setNewName] = useState('Enter a Name')
  const [newNumber, setNewNumber] = useState('Enter a Number')
  const [filter, setFilter] = useState('')

  // set the state with axios & datatabase
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObj = { name: newName, number: newNumber };
      setPersons(persons.concat(personObj));
      setNewName(''); // clear the input field after submission 
      setNewNumber(''); // clear the input field after submission 
    }
  }

  const handleName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value)
  }

  // filter what will be passed into Display JSX
  const peopleDisplay = persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <AddPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleName}
        handleNumberChange={handleNumber}
      />

      <Display entry={peopleDisplay} />

      <hr></hr>
      <small>debug newName: {newName}</small>
      <br></br>
      <small>debug newNumber: {newNumber}</small>

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))























/*  Study Notes:

--- From FULLSTACKOPEN Part 2 - Axios ---

Storing the promise object in a variable is generally unnecessary,
and it's instead common to chain the then method call to the axios method call,
so that it follows it directly:

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})

or in a "more readable way"

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })

  The data returned by the server is plain text, basically just one long string.
  The axios library is still able to parse the data into a JavaScript array,
  since the server has specified that the data format is application/json;
  charset=utf-8 (see previous image) using the content-type header.



  The Effect Hook lets you perform side effects in function components.
  Data fetching, setting up a subscription, and manually changing the DOM in React
  components are all examples of side effects.






  -------------

https://reactjs.org/docs/hooks-state.html

What does useState return?
It returns a pair of values: the current state and a function that updates it.
This is why we write const [count, setCount] = useState().
This is similar to this.state.count and this.setState in a class,
except you get them in a pair.


//Assume notes is an array of 'notes' objects defined elsewhere

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  // ...
}

If we wanted to start with an empty list of notes we would set the initial
value as an empty array, and since the props would not be used, we could omit the
props parameter from the function definition:

const App = () => {
  const [notes, setNotes] = useState([])

  // ...
}

https://reactjs.org/docs/handling-events.html

const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
}

The event handler immediately calls the event.preventDefault() method,
which prevents the default action of submitting a form.
The default action would, among other things, cause the page to reload.





*/
