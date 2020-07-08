// FullStackOpen Phonebook - through v2.19

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
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
  <div className="add">
    <h2>Add or update a person:</h2>
    <form onSubmit={props.addPerson}>
      <div>name: <input value={props.newName} onChange={props.handleNameChange} /> </div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button type="submit">add to phonebook</button></div>
    </form>
  </div>
)

const PhoneBookEntry = (props) => {
  return (
    <div>
      <li>{props.entry.name}</li>
      <li>{props.entry.number}</li>
      <button onClick={() => props.dfx(props.entry.id)}>Click to Delete</button>
      <small> json db id: {props.entry.id}</small>
    </div>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className={props.style}>
      {props.message}
    </div>
  )
}



const App = (props) => {
  const [persons, setPersons] = useState([])  // this time populated with useEffect and axios
  const [newName, setNewName] = useState("Enter a name")
  const [newNumber, setNewNumber] = useState("Enter a Number")
  const [filter, setFilter] = useState("")
  const [notifmsg, setNotification] = useState("");
  const [notifcss, setCss] = useState("")


  // obtain values from db with axios to persons/setPersons state & extracted w/ personsDB
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const notifHandler = (message, style) => {
    setNotification(message);
    setCss(style);
  }


  const addPerson = (event) => {
    event.preventDefault()  // form submissions default reload the page so we need to prevent this
    if (persons.find(x => x.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, want to update their phone number?`)) {
        const entry = persons.find(x => x.name === newName);
        entry.number = newNumber;
        personService.update(entry.id, entry).then(rtnobj => {
          setPersons(persons.filter(p => p.id))
        });
        notifHandler(`${newName} has been updated.`, "success");
        setTimeout(() => {
          notifHandler(null, null)
        }, 5000)
      }
    } else {
      const personObj = { name: newName, number: newNumber };
      // Using axios, allow us to "save" data in jsondb & update the view, extracted w personsDB
      personService.create(personObj).then(returnedObj => { setPersons(persons.concat(returnedObj)) });
      notifHandler(`${newName} has been created.`, "success");
      setTimeout(() => {
        notifHandler(null, null)
      }, 5000)
      setNewName('');
      setNewNumber('');
    }
  }
  // filter what will be passed into Display JSX
  const peopleDisplay = persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))

  const deleteById = (id) => {
    const deleteme = persons.find(element => element.id === id);
    if (deleteme === undefined) {
      alert("Error assigning deleteme, it is undefined. Returning now.");
      return;
    } else {
      if (window.confirm("Are you sure you wish to delete: " + deleteme.name)) {
        personService.deleteID(id, deleteme)
          .then(rtnobj => {
            setPersons(persons.filter(p => p.id !== id))
            notifHandler(`${deleteme.name} has been deleted!`, "error");
            setTimeout(() => {
              notifHandler(null, null)
            }, 5000);
          })
          .catch(error => {
            if (error.response) {
              notifHandler("Recieved error response, i.e. 404.", "error");
              setTimeout(() => {
                notifHandler(null, null)
              }, 5000);
              setPersons(persons.filter(p => p.id !== id))
            } else {
              alert("Unhandled error here...");
              setPersons(persons.filter(p => p.id !== id))
            }
          })
      }
    }
  }


  return (
    <div className="phonebook">
      <h1>Phonebook</h1>

      <Notification message={notifmsg} style={notifcss} />

      <Filter filter={filter} handleFilter={handleFilter} />

      <AddPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleName}
        handleNumberChange={handleNumber}
      />

      <br></br>

      <Display entry={peopleDisplay} deletefx={deleteById} />

    </div>
  )
}


ReactDOM.render(<App/>, document.getElementById('root'))








