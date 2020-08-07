import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data
    case "NEW_BLOG":
      return [...state, action.content]
    case "LIKE_BLOG":
      const id = action.data.updatedBlog.id
      const blogToChange = state.find((a) => a.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    case "DELETE_BLOG":
      return action.data
    case "SET_TOKEN":
      return state
    default:
      return state
  }
}

export const setToken = (token) => {
  return async (dispatch) => {
    await blogService.setToken(token)
    dispatch({
      type: "SET_TOKEN",
      data: token
    })
  }
}

export const remove = (blog) => {
  return async (dispatch) => {
    const remainingBlogs = await blogService.remove(blog.id)
    dispatch({
      type: "DELETE_BLOG",
      data: remainingBlogs
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addLike(blog)
    dispatch({
      type: "LIKE_BLOG",
      data: { updatedBlog }
    })
  }
}

export const newBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: "NEW_BLOG",
      content: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    })
  }
}

export default reducer
