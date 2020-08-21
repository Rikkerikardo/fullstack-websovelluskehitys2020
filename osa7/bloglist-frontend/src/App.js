import React, { useEffect } from "react"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { logOut } from "./reducers/loggedUserReducer"
import { initializeUsers } from "./reducers/allUserReducer"
import UserList from "./components/UserList"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Button, Alert } from "react-bootstrap"
import User from "./components/User"
import Blog from "./components/Blog"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const logout = () => {
    dispatch(logOut())
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <Notification />
      <div className="container">
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/blogs">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>
        <Switch>
          <React.Fragment>
            <h1>Blogs</h1>

            {localStorage.getItem("token") === null ? (
              loginForm()
            ) : (
              <div>
                <Alert variant="success">
                  {user.username} logged in
                  <Button
                    className="my-3 mx-3"
                    variant="dark"
                    onClick={() => logout()}
                  >
                    logout
                  </Button>
                </Alert>
                {blogForm()}
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/blogs/:id">
                  <Blog />
                </Route>
                <Route path="/blogs">
                  <BlogList />
                </Route>
              </div>
            )}
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  )
}

export default App
