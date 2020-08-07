import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import loggedUserReducer from "./reducers/loggedUserReducer"
import allUserReducer from "./reducers/allUserReducer"
import commentReducer from "./reducers/commentReducer"

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: loggedUserReducer,
  allUsers: allUserReducer,
  comments: commentReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
