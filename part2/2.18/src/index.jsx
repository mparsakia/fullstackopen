// FullStackOpen up to 2.18 extends phonebook
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/personsDB'

const Filter = (props) => (
  <p>
    Filter by Name: <input value={props.filter} onChange={props.handleFilter} />
  </p>
)

const Display = (props) => (
  <div>
    {props.entry.map(ent => <PhoneBookEntry key={ent.id} entry={ent} dfx={props.deletefx} />)}
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
  return (
    <p>
      <li>{props.entry.name}</li>
      <li>{props.entry.number}</li>
      <button onClick={() => props.dfx(props.entry.id)}>Click to Delete</button>
      <small> json db id: {props.entry.id}</small>
    </p>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState([])  // this time populated with useEffect and axios
  const [newName, setNewName] = useState("Enter a name")
  const [newNumber, setNewNumber] = useState("Enter a Number")
  const [filter, setFilter] = useState("")


  // obtain values from db with axios to persons/setPersons state & extracted w/ personsDB
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()  // form submissions default reload the page so we need to prevent this
    if (persons.find(x => x.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, want to update their phone number?`)) {
        const entry = persons.find(x => x.name === newName)
        entry.number = newNumber
        personService.update(entry.id, entry).then(rtnobj => {
          setPersons(persons.filter(p => p.id))
        })
      }
    } else {
      const personObj = { name: newName, number: newNumber };
      // Using axios, allow us to "save" data in jsondb & update the view, extracted w personsDB
      personService.create(personObj).then(returnedObj => { setPersons(persons.concat(returnedObj)) })
      setNewName('');
      setNewNumber('');
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  // filter what will be passed into Display JSX
  const peopleDisplay = persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))


  const deleteById = (id) => {
    console.log("deleteById: ", id);
    const deleteme = persons.find(element => element.id === id);
    if (deleteme === undefined) {
      alert("Error assigning deleteme, it is undefined. Returning now.");
      return;
    } else {
      console.log("we are deleting: ", deleteme.name, " with ID: ", deleteme.id);
      if (window.confirm("Are you sure you wish to delete: " + deleteme.name)) {
        personService.deleteID(id, deleteme)
          .then(rtnobj => {
            setPersons(persons.filter(p => p.id !== id))
            alert("Goodbye, " + deleteme.name + "\nDelete complete.");
          })
          .catch(error => {
            alert("There was an error.");
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }
  }


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

      <Display entry={peopleDisplay} deletefx={deleteById} />

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))























/*  Study Notes: FULLSTACKOPEN Part 2 - Data in Server ---

Resources are fetched from the server with HTTP GET requests.
For instance, an HTTP GET request to the URL notes/3 will return the note that has the id number 3.
An HTTP GET request to the notes URL would return a list of all notes.

Creating a new resource for storing a note is done by making an HTTP POST
request to the notes URL according to the REST convention that the json-server adheres to.
The data for the new note resource is sent in the body of the request.
json-server requires all data to be sent in JSON format.


Let's make the following changes to the event handler responsible for creating a new note:

addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date(),
    important: Math.random() > 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)

    })
}

We create a new object for the note but omit the id property,
since it's better to let the server generate ids for our resources!

Since the data we sent in the POST request was a JavaScript object,
axios automatically knew to set the appropriate application/json value for the Content-Type header.

The new note is not rendered to the screen yet.
This is because we did not update the state of the App component when we created the new note.
Let's fix this:

addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date(),
    important: Math.random() > 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
}


 An important detail to remember is that the concat method does not change
 the component's original state, but instead creates a new copy of the list.





------

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
