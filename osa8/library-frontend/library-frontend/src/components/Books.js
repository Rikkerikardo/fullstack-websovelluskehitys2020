import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genreToShow, setGenreToShow] = useState("all")

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = result.data.allBooks
    .map((b) => b.genres)
    .filter((genre) => {
      if (genre.length > 0) return genre
    })

  const filteredGenres = []
  genres.forEach((element) => {
    element.forEach((index) => {
      filteredGenres.push(index)
    })
  })
  const uniqueGenres = Array.from(new Set(filteredGenres))

  const showBooksByGenre = () => {
    if (genreToShow === "all")
      return (
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {result.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )

    const uniqueGenres = result.data.allBooks.filter((book) => {
      if (book.genres.includes(genreToShow)) return book
    })

    return (
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {uniqueGenres.map((a) => (
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

  const genreOptions = () => {
    return (
      <div>
        <div>
          <h4>Filter books by genre</h4>
          {uniqueGenres.map((a, i) => {
            return (
              <button onClick={() => setGenreToShow(a)} key={i}>
                {a}
              </button>
            )
          })}
        </div>
        <button onClick={() => setGenreToShow("all")}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      {showBooksByGenre()}
      {genreOptions()}
    </div>
  )
}

export default Books
