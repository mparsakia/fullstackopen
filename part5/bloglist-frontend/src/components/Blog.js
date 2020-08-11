import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, likebutton, deletebutton, user }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: "1px solid white",
    borderWidth: 1,
    marginBottom: 3,
  };

  const addOneLike = (event) => {
    event.preventDefault();
    const newBlogObj = {
      user: blog.id.toString(),
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    const id = blog.id.toString();
    likebutton(newBlogObj, id);
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    if (
      window.confirm(`Do you want to delete: ${blog.title} by ${blog.author}?`)
    ) {
      deletebutton(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      Title: {blog.title}
      <br></br>
      Author: {blog.author}
      <Togglable buttonLabel="expand info">
        URL: <a href={blog.url}>{blog.url}</a>
        <br></br>
        Likes: {blog.likes} <button onClick={addOneLike}>add like</button>
        <br></br>
        {(() => {
          if (Object.prototype.hasOwnProperty.call(blog, "user")) {
            return (
              <small>
                added by: {blog.user.username} | blog-id: {blog.id}
              </small>
            );
          } else {
            return <small>blog has no user | blog-id: {blog.id}</small>;
          }
        })()}
        <br></br>
        {(() => {
          // make sure we aren't attempting to read null / undefined, if user is not logged in
          // users must be logged in to see the delete button anyway...
          if (!user) {
            return null;
          }
          // We have a logged in user, start checking if they should see the delete button...
          if (Object.prototype.hasOwnProperty.call(blog, "user")) {
            if (Object.prototype.hasOwnProperty.call(user, "username")) {
              if (user.username === blog.user.username) {
                return <button onClick={deleteBlog} id='delbtn'>delete this entry</button>;
              } else {
                return null;
              }
            } else {
              return null;
            }
          } else {
            return null;
          }
        })()}
        <br></br>
      </Togglable>
    </div>
  );
};

export default Blog;

// ************* NOTES *************
// Note: the IIFE for  "added by: {blog.user.username}", some of our data has errors.
// The issue is that there is "blog.user", but not + .username..  For now, this does not crash the app...
// So, it will render "added by: " and then it will be blank.
// For now we will leave these 'errors' in the database
// they were created when creating the backend DB first time, trying to get the data schema correct
// But if the app crashes try disabling the IIFE for "added by: ... | blog id: ..."
// Or go to the MongoDB and delete/correct the improper data
