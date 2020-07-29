import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    console.log("BlogForm createblog", createBlog)
    setBlogTitle("")
    setBlogAuthor("")
    setBlogUrl("")
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="titleID"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="authorID"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="urlID"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm
