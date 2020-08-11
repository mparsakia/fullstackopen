import React, { useState } from "react";

const AddBlogForm = ({ addNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    addNewBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <div className="formDiv">
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <label>Blog Title:</label>
        <input
          id="title"
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
        <br></br>
        <label>Blog Author:</label>
        <input
          id="author"
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
        <br></br>
        <label>Blog URL:</label>
        <input id="url" value={newBlogUrl} onChange={handleBlogUrlChange} />
        <br></br>
        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
