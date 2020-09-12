import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // we need to get all "resources" but not spam the API, like in country-hook
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setResources(res.data);
    });
  }, [baseUrl]);
  // now resources can be anything the API returns -- "x.data"

  // create i.e. post a "resource" to the API as defined:
  // --- THE API from NOTES and PHONEBOOK: ---
  // const create = async newObject => {
  //   const config = {
  //     headers: { Authorization: token },
  //   }
  //   const response = await axios.post(baseUrl, newObject, config)
  //   return response.data
  // }
  // -------
  const create = (resource) => {
    const config = {
      headers: { Authorization: `bearer token` },
    }; // set the auth token & i.e. config

    axios.post(baseUrl, resource, config).then(() => {
      setResources(resources.concat(resource));
    }); // and then query the API with our 3 params, and update our resources after its posted
  };

  const service = {
    create,
  };

  return [resources, service]; // * see below
};
// from FullStackOpen specs: 7.8
// The useResource custom hook returns an array of two items just like the state hooks.
// The first item of the array contains all of the individual resources and the second item of the
// array is an object that can be used for manipulating the resource collection, like creating new ones.

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
