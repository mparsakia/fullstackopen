import React, { useState } from "react";
// import {React, useState} from "react" causes an error... so import like above

const Books = ({ books, show }) => {
  const [filter, setFilter] = useState(null);

  if (!show || books.loading) {
    return null;
  }

  const uniqueGenres = [
    ...new Set(books.data.allBooks.map((x) => x.genres).flat(Infinity)),
  ]; // copy all genres arrays, flatten them to 1D array, remove duplicates w/ Set (unique elements only)
  // https://www.wsvincent.com/javascript-remove-duplicates-array/

  const filteredBooks = books.data.allBooks.filter((x) =>
    filter ? x.genres.includes(filter) : true
  ); // if filter is null, we just map everything over as true, else do .includes(filter)

  return (
    <div>
      <h2>filter books by genre</h2>
      {uniqueGenres.map((gen) => (
        <button key={gen} onClick={() => setFilter(gen)}>
          {gen.toString()}
        </button>
      ))}
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setFilter(null)}>show all books</button>
    </div>
  );
};

export default Books;
