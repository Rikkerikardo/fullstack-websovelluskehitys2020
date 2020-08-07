import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route, Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
const UserList = () => {
  const users = useSelector((state) => state.allUsers)

  return (
    <Switch>
      <Route path="/:id">
        <div>
          <h2>All users</h2>
          {users.map((user) => (
            <ListGroup key={user.id}>
              <ListGroup.Item>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
                {` blogs created ${user.blogs.length}`}
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      </Route>
    </Switch>
  )
}

export default UserList
