import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteID = (id, newObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
}

export default {
  getAll: getAll,
  create: create,
  deleteID: deleteID,
  update: update
}





/**
 * The App component has become somewhat bloated after adding the
 * code for communicating with the backend server. In the spirit of the
 * single responsibility principle, we deem it wise to extract this
 * communication into its own module.
 *
 *
 * The module returns an object that has three functions
 * (getAll, create, and update) as its properties that deal with notes.
 * The functions directly return the promises returned by the axios methods.
 * The App component uses import to get access to the module:
 *
 * The functions of the module can be used directly with the imported variable noteService as follows:
 *  https://fullstackopen.com/en/part2/altering_data_in_server (scroll down to Extracting comms...)
 *
 * In practice, the error handler for rejected promises is defined like this:

    axios
      .get('http://example.com/probably_will_fail')
      .then(response => {
        console.log('success!')
      }).catch(error => {
        console.log('fail')
      })

   If the request fails, the event handler registered with the catch method gets called.
   When our application makes an HTTP request, we are in fact creating a promise chain:


    const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
    }

    Removing an already deleted note from the application's state is done with the array filter method,
    which returns a new array comprising only of the items from the list for which the function that
    was passed as a parameter returns true for:    notes.filter(n => n.id !== id)

 *
 */