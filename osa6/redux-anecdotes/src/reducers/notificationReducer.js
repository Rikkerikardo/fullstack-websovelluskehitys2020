const notificationReducer = (state = "Notifications appear here", action) => {
  switch (action.type) {
    case "CLEAR_NOTIFICATION":
      return ""
    case "NEW_NOTIFICATION":
      return action.data.content
    default:
      return state
  }
}

export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: { content }
    })
    var timerID
    timerID = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      })
    }, timeout * 1000)
    if (timerID) clearTimeout(timerID)
  }
}

export default notificationReducer
