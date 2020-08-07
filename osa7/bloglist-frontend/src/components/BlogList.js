import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="my-3 mx-3">
      <h2>All blogs</h2>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{`by ${blog.author}`}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
