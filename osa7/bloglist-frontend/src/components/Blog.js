import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { addLike, remove } from "../reducers/blogReducer"
import { useParams } from "react-router-dom"
import { initializeComments } from "../reducers/commentReducer"
import { newComment } from "../reducers/commentReducer"
import { Button } from "react-bootstrap"

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const comments = useSelector((state) => state.comments)

  useEffect(() => {
    dispatch(initializeComments(id))
  }, [dispatch, id])

  const like = (blog) => {
    dispatch(addLike(blog))
    dispatch(setNotification(`you liked ${blog.title}`, 5))
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(remove(blog))
      dispatch(setNotification(`you removed ${blog.title}`, 5))
    }
  }

  const commentView = () => {
    return (
      <div className="card my-3 mx-3">
        {comments.length !== 0 ? (
          <div>
            <h6 className="card-header">comments</h6>
            {comments.map((comment) => (
              <li className="list-group-item" key={comment.id}>
                {comment.content}
              </li>
            ))}
          </div>
        ) : (
          <div>
            <h6 className="card-header">no comments</h6>
          </div>
        )}
      </div>
    )
  }

  const commentForm = () => {
    const addComment = (event) => {
      event.preventDefault()
      const comment = {
        content: event.target.content.value
      }
      event.target.content.value = ""
      dispatch(newComment(id, comment))
    }

    return (
      <div className="form-group my-3 mx-3">
        <label className="form-control-lg">Add comment</label>
        <form onSubmit={addComment}>
          <input className="form-control" name="content" />
          <Button className="my-3 mx-3" variant="info" type="submit">
            comment
          </Button>
        </form>
      </div>
    )
  }

  if (!blog) return null
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>{" "}
          <Button className="my-3" variant="info" onClick={() => like(blog)}>
            like
          </Button>
          <div className="card-text">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Author: {blog.author}</li>
              <li className="list-group-item">
                URL:
                <a href={blog.url} className="card-link">
                  {` ${blog.url}`}
                </a>
              </li>
              <li className="list-group-item">Likes: {blog.likes}</li>
            </ul>
            {blog.user.username === user.username ? (
              <Button
                className="my-3"
                variant="dark"
                onClick={() => removeBlog(blog)}
              >
                delete
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div>
          {commentView()}
          {commentForm()}
        </div>
      </div>
    </div>
  )
}

export default Blog
