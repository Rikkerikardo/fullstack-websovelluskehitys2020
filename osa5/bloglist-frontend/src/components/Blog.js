import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, addLike, remove }) => {
  const [detailedView, setDetailedView] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {detailedView === true ? (
        <div style={blogStyle} className="blog">
          {blog.title}
          <button text="view" onClick={() => setDetailedView(false)}>
            view
          </button>
        </div>
      ) : (
        <div style={blogStyle} className="blog">
          Title: {blog.title}{" "}
          <button onClick={() => setDetailedView(true)}>hide</button>
          <br />
          Author: {blog.author}
          <br />
          URL: {blog.url}
          <br />
          Likes: {blog.likes} <button onClick={addLike}>likes</button>
          <br />
          {blog.user.username ===
          JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
            .username ? (
            <button onClick={remove}>delete</button>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
