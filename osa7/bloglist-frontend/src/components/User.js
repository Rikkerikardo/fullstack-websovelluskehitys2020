import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"

const User = () => {
  const users = useSelector((state) => state.allUsers)
  const id = useParams().id
  const user = users.find((n) => n.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <ListGroup className="my-3 mx-3">
        <ListGroup.Item variant="info">
          <h2>{user.username}</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          {user.blogs.length !== 0 ? (
            <div>added blogs:</div>
          ) : (
            <div>no blogs added</div>
          )}
        </ListGroup.Item>

        {user.blogs.map((blog) => (
          <ListGroup key={blog.id}>
            <ListGroup.Item variant="dark">{blog.title}</ListGroup.Item>
          </ListGroup>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
