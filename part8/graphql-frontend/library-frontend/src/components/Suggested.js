import React from "react";

const Suggested = ({ show, user, books }) => {
  if (!show || user.loading || books.loading) {
    return null;
  }

  const genreFilter = user.data.me.favoriteGenre;

  const filteredBooks = books.data.allBooks.filter((x) =>
    genreFilter ? x.genres.includes(genreFilter) : true
  );

  if (filteredBooks.length === 0) {
    return (
      <div>
        <h1>
          Sorry, {user.data.me.username}, there are no books with your favorite
          genre.
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h2>Suggested Books for {user.data.me.username}</h2>
      <p>books in your favorite genre: {user.data.me.favoriteGenre}</p>
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
    </div>
  );
};

export default Suggested;
