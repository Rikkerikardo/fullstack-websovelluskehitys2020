import React from "react"
import { useDispatch } from "react-redux"
import { login } from "../reducers/loggedUserReducer"
import { Form, Button } from "react-bootstrap"

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogIn = (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    dispatch(login(credentials))
    event.target.username.value = ""
    event.target.password.value = ""
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogIn}>
        <Form.Label>username</Form.Label>
        <Form.Control id="username" type="text" name="username" />
        <Form.Label>password</Form.Label>
        <Form.Control id="password" type="password" name="password" />
        <Button className="my-3" variant="info" id="login-button" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
