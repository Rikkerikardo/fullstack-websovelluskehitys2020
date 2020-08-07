import commentService from "../services/comment"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_COMMENTS":
      return action.data
    case "NEW_COMMENT":
      return [...state, action.content]
    default:
      return state
  }
}

export const newComment = (id, content) => {
  return async (dispatch) => {
    const comment = await commentService.create(id, content)
    dispatch({
      type: "NEW_COMMENT",
      content: comment
    })
  }
}

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getAll(id)
    dispatch({
      type: "INIT_COMMENTS",
      data: comments
    })
  }
}

export default reducer
