const Blog = require("../models/blog")
const User = require("../models/user")

const user = new User({ username: "root", passwordHash: "topsekret" })
const initialBlogs = [
  {
    title: "Test title",
    author: "Test author",
    url: "testurl",
    likes: 66,
    user: user,
  },
  {
    title: "2Test title",
    author: "2Test author",
    url: "2testurl",
    likes: "266",
    user: user,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
