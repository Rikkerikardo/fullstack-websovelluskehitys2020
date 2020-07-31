import React from "react"
import { connect } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    props.newAnecdote(content)
    props.setNotification(`Added new anecdote: ${content}`, 10)
  }

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(null, { newAnecdote, setNotification })(AnecdoteForm)
