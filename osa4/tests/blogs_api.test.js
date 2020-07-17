const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const middleware = require("../utils/middleware")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const { response } = require("express")
const { request } = require("../app")
const { deleteOne } = require("../models/blog")

const api = supertest(app)
const auth = {}

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({ username: "root", passwordHash: "topsekret" })

  await user.save()

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("the first blog is about testing", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body[0].title).toBe("Test title")
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs")

  const titles = response.body.map((r) => r.title)

  expect(titles).toContain("2Test title")
})

test("blogs identify by id", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body[0].id).toBeDefined()
})

test("HTTP POST to api/blogs doesn't work without token", async () => {
  const user = new User({ username: "root", passwordHash: "topsekret" })
  const newBlog = {
    title: "Testing POST",
    author: "Tester",
    url: "Testing",
    likes: 66,
    user: user,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/)
})

test("HTTP POST to api/blogs works with tokens", async () => {
  const user = new User({ username: "testUser", passwordHash: "topsekret" })
  const newBlog = {
    title: "Testing POST",
    author: "Tester",
    url: "Testing",
    likes: 66,
    user: user,
  }

  await api
    .post("/api/users")
    .send({
      username: user.username,
      name: user.username,
      password: user.passwordHash,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const loginResponse = await api
    .post("/api/login")
    .send({
      username: user.username,
      password: user.passwordHash,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${loginResponse.body.token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const titles = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain("Testing POST")
})

test("Likes value is 0 if not defined", async () => {
  const user = new User({ username: "testUser", passwordHash: "topsekret" })
  const newBlog = {
    title: "Testing POST Likes value",
    author: "Tester",
    url: "Testing",
  }

  await api
    .post("/api/users")
    .send({
      username: user.username,
      name: user.username,
      password: user.passwordHash,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const loginResponse = await api
    .post("/api/login")
    .send({
      username: user.username,
      password: user.passwordHash,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${loginResponse.body.token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  expect(response.body[2].likes).toBe(0)
})

test("If POST doesn't contain title or url, return 400", async () => {
  const user = new User({ username: "testUser", passwordHash: "topsekret" })

  const newBlog = {
    author: "Tester",
  }

  await api
    .post("/api/users")
    .send({
      username: user.username,
      name: user.username,
      password: user.passwordHash,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const loginResponse = await api
    .post("/api/login")
    .send({
      username: user.username,
      password: user.passwordHash,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${loginResponse.body.token}`)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
