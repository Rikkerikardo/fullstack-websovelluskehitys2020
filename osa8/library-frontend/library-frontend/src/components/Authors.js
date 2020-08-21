import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const Authors = ({ setError, show }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState(0)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const result = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born } })
    setName("")
    setBorn(0)
  }

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const options = result.data.allAuthors.map((a) => a.name)

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={handleChange}>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
