import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return <div className="error">{message}</div>
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      console.log("new blog", returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      console.log("all blogs", blogs)
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const addLike = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, changedBlog)
      .then((updatedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      })
      .catch((error) => {
        setErrorMessage(`Blog '${blog.title}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const remove = (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      blogService.remove(blog.id).then((updatedBlogs) => {
        setBlogs(updatedBlogs)
        setMessage(`blog removed`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    setPassword("")
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage === null ? message : errorMessage} />

      <h2>Login</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={() => logout()}>logout</button>
          </p>

          {blogForm()}

          <h2>All blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <Blog
                key={index}
                blog={blog}
                addLike={() => addLike(blog.id)}
                remove={() => remove(blog)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
