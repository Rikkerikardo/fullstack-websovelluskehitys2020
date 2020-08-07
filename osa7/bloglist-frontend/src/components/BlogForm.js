import React from "react"
import { useDispatch } from "react-redux"
import { newBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { Table, Button } from "react-bootstrap"

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    event.target.title.value = ""
    event.target.author.value = ""
    event.target.url.value = ""
    dispatch(newBlog(content))
    dispatch(
      setNotification(`a new blog ${content.title} by ${content.author} added`)
    )
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <Table variant="dark">
          <tbody>
            <tr>
              <td>
                <label className="form-control-lg">Title</label>
              </td>
              <td>
                <input className="form-control" id="titleID" name="title" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="form-control-lg">Author</label>
              </td>
              <td>
                <input className="form-control" id="authorID" name="author" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="form-control-lg">URL</label>
              </td>
              <td>
                <input className="form-control" id="urlID" name="url" />
              </td>
            </tr>
          </tbody>
        </Table>
        <Button variant="info" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}
export default BlogForm
