const express = require("express")
const app = express()
const morgan = require("morgan")
app.use(express.json())
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
)

morgan.token("post", function (request, response) {
  return JSON.stringify(request.body)
})

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br /> ${new Date()}`
  )
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    })
  }

  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: `name ${body.name} is already in phonebook!`,
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(10000000)),
  }

  persons = persons.concat(person)

  response.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelance",
    number: "040-53345",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "050-678865",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "040-565465634-36365",
    id: 4,
  },
]
