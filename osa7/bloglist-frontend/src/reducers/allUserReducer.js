import userService from "../services/users"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data
    case "NEW_USER":
      return [...state, action.content]
    case "DELETE_USER":
      return action.data
    default:
      return state
  }
}

export const remove = (user) => {
  return async (dispatch) => {
    const remainingUsers = await userService.remove(user.id)
    dispatch({
      type: "DELETE_USER",
      data: remainingUsers
    })
  }
}

export const newUser = (content) => {
  return async (dispatch) => {
    const newUser = await userService.create(content)
    dispatch({
      type: "NEW_USER",
      content: newUser
    })
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: "INIT_USERS",
      data: users
    })
  }
}

export default reducer
