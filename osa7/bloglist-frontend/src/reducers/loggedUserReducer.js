import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer"

const initialState = {
  username: localStorage.getItem("user"),
  isLoggedIn: localStorage.getItem("isLoggedIn"),
  token: localStorage.getItem("token")
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_USER":
      return {
        ...state,
        username: action.data.username,
        isLoggedIn: true
      }
    case "LOG_OUT":
      return { initialState }
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      await blogService.setToken(user.token)
      localStorage.setItem("user", user.username)
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("token", user.token)
      dispatch({
        type: "LOGGED_USER",
        data: user
      })
    } catch (exception) {
      dispatch(setNotification("wrong credentials", 5))
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    localStorage.clear()
    dispatch({
      type: "LOG_OUT"
    })
  }
}

export default reducer
