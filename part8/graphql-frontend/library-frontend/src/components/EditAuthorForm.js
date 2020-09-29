import React, { useState } from "react";

const EditAuthorForm = (props) => {
  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState(props.allAuthors[0].name);
  // the name value will not be updated, so inital state should be the first option in the list

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("CLOG NAME:", name);
    // console.log("CLOG BIRTHYEAR:", birthyear);

    props.editAuthor({
      variables: { name: name, born: Number(birthyear) },
    });

    setBirthyear("");
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>update author birthyear</h2>
        <label>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {props.allAuthors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

// https://reactjs.org/docs/forms.html#the-select-tag

export default EditAuthorForm;
