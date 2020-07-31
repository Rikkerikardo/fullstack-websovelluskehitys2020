import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.updatedAnecdote.id
      const anecdoteToChange = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case "NEW_ANECDOTE":
      return [...state, action.content]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      content: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: "VOTE",
      data: { updatedAnecdote }
    })
  }
}

export default reducer
