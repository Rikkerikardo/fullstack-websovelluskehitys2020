import React, { useState, useEffect } from "react"
import Note from "./components/Note"
import axios from "axios"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState("")
  const [message, setMessage] = useState()

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.filter((person) => person.name === newName).length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const originalPerson = persons.find((p) => p.name === newName)
        const changedPerson = { ...originalPerson, number: newNumber }

        personService
          .update(originalPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            )
            setMessage(`Successfully edited ${originalPerson.name} information`)
          })
          .catch((error) => {
            setMessage(
              `Information of ${originalPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(noteObject)
        .then((returnedNote) => {
          setPersons(persons.concat(returnedNote))
          setNewName("")
          setNewNumber("")
          setMessage(`Added ${returnedNote.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error.response.data)
          setMessage(`${JSON.stringify(error.response.data)}`)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }

  const handleDelete = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then((remainingPersons) => {
        setPersons(remainingPersons)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter event={handleFilter} />

      <AddPerson
        handleSubmit={addPerson}
        handleChange={handleNameChange}
        value={newName}
        handleChange2={handleNumberChange}
      />

      <h2>Numbers</h2>

      <PersonsToShow
        persons={persons}
        filter={showAll}
        handleClick={handleDelete}
      />
    </div>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "yellow",
    fontStyle: "italic",
    fontSize: 16,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === null) {
    return null
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

const AddPerson = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleChange} />
      </div>
      <div>
        number: <input onChange={props.handleChange2} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
      Filter shown with
      <form>
        filter: <input onChange={props.event} />
      </form>
    </div>
  )
}

const PersonsToShow = ({ persons, filter, handleClick }) => {
  /* const personsToShow = persons.filter((person) => person.name.includes(filter)) */

  return persons
    .filter((person) => person.name.includes(filter))
    .map((person) => (
      <p key={person.name.toString()}>
        {person.name} {person.number}
        <button onClick={() => handleClick(person)}>delete</button>
      </p>
    ))
}

export default App
