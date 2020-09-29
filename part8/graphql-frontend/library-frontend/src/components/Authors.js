import React from "react";
import EditAuthorForm from "./EditAuthorForm";

const Authors = ({ authors, editAuthor, show }) => {
  if (!show || authors.loading) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : "Unknown"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthorForm
        allAuthors={authors.data.allAuthors}
        editAuthor={editAuthor}
      />
    </div>
  );
}; // remember authors is now a GraphQL object, we need to access the proper datafield before mapping

export default Authors;
