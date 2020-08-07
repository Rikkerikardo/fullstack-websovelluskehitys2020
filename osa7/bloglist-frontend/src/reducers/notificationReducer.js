const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "CLEAR_NOTIFICATION":
      return null
    case "NEW_NOTIFICATION":
      return action.data.content
    default:
      return state
  }
}
var timerID
export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    clearTimeout(timerID)
    dispatch({
      type: "NEW_NOTIFICATION",
      data: { content }
    })

    timerID = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
