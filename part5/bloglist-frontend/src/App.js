import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"
import Togglable from "./components/Togglable"
import AddBlogForm from "./components/AddBlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifmsg, setNotification] = useState("")
  const [notifcss, setCss] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // in chrome console can use window.localStorage.clear() to logout
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginFunction = async (credsObj) => {
    const username = credsObj.username
    const password = credsObj.password
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log(exception)
      notifHandler("Username or Password is Incorrect!", "error")
      setTimeout(() => {
        notifHandler(null, null)
      }, 5000)
    }
  }


  const notifHandler = (message, style) => {
    setNotification(message)
    setCss(style)
  }

  const addNewBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((rtnBlog) => {
        setBlogs(blogs.concat(rtnBlog))

        notifHandler(
          `${blogObject.title}, ${blogObject.author} at ${blogObject.url} added.`,
          "success"
        )
        setTimeout(() => {
          notifHandler(null, null)
        }, 5000)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error)
          console.log(error.response)
          notifHandler("Recieved error response, see console...", "error")
          setTimeout(() => {
            notifHandler(null, null)
          }, 5000)
        }
      })
  }



  const loginForm = () => (
    <Togglable buttonLabel="open login form">
      <LoginForm loginFunction={loginFunction} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="add new blog">
      <AddBlogForm addNewBlog={addNewBlog} />
    </Togglable>
  )

  function logoutUser() {
    window.localStorage.clear()
    window.location.reload()
    notifHandler("Logging Out...", "error")
    setTimeout(() => {
      notifHandler(null, null)
    }, 5000)
    return null
  }

  const logoutButton = () => {
    return <button onClick={logoutUser}>logout</button>
  }

  const addBlogLike = async (blogObject, id) => {
    try {
      const addedLikeBlog = await blogService.update(id, blogObject)
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : addedLikeBlog
      )
      setBlogs(updatedBlogs)
      notifHandler("Added a like to the blog!", "success")
      setTimeout(() => {
        notifHandler(null, null)
      }, 5000)
    } catch (error) {
      console.log(error)
      console.log(error.response)
      notifHandler("Error adding like to the blog.", "error")
      setTimeout(() => {
        notifHandler(null, null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteById(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)
      notifHandler("Blog has been deleted.", "success")
      setTimeout(() => {
        notifHandler(null, null)
      }, 5000)
    } catch (error) {
      console.log(error)
      console.log(error.response)
      if (error.response.status === 401) {
        notifHandler(
          "You are not the owner of this blog! 401 Unauthorized.",
          "error"
        )
        setTimeout(() => {
          notifHandler(null, null)
        }, 5000)
      } else {
        notifHandler("Error deleting the blog - see console.log", "error")
        setTimeout(() => {
          notifHandler(null, null)
        }, 5000)
      }
    }
  }

  const getBlogs = () => {
    return (
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likebutton={addBlogLike}
              deletebutton={deleteBlog}
              user={user}
            />
          ))}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notifmsg} style={notifcss} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in. <small>| username: {user.username}</small>
          </p>
          {console.log(user)}
          {logoutButton()}
          {blogForm()}
        </div>
      )}

      <h2>all blogs</h2>
      {getBlogs()}
    </div>
  )
}

export default App
