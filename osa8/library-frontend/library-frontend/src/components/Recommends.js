import React from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommends = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const favoriteGenreResult = useQuery(ME)

  if (!show) {
    return null
  }

  if (favoriteGenreResult.loading) {
    return <div>loading...</div>
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = favoriteGenreResult.data.me.favoriteGenre

  const showBooksByGenre = () => {
    const recommendedBooks = result.data.allBooks.filter((book) => {
      if (book.genres.includes(favoriteGenre)) return book
    })

    return (
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre <b>{favoriteGenre}</b>
      {showBooksByGenre()}
    </div>
  )
}
export default Recommends
