import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  token = `bearer ${localStorage.getItem("token")}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then((response) => response.data)
}

const remove = async (id) => {
  token = `bearer ${localStorage.getItem("token")}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addLike = async (blog) => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, changedBlog)
  return response.data
}

export default { getAll, create, update, setToken, remove, addLike }
