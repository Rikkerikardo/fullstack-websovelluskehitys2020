const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require("apollo-server")
const { v1: uuid } = require("uuid")
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const { PubSub } = require("apollo-server")
const pubsub = new PubSub()

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY"

mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

const MONGODB_URI =
  "mongodb+srv://fullstack:salainen@cluster0.8ymv5.mongodb.net/graphql?retryWrites=true&w=majority"
console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author) {
        return Book.findOne({ author: args.author })
      }
      if (args.genre) {
        return Book.find({ genre: args.genre })
      }
      return Book.find({})
    },
    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },
  Author: {
    bookCount: async (root) => {
      const authorsBooks = await Book.find({
        author: root
      }).countDocuments()
      return authorsBooks
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        if ((await Author.findOne({ name: args.author })) === null) {
          const newAuthor = new Author({
            name: args.author,
            born: 0,
            bookCount: 1
          })
          await newAuthor.save()
        }

        const author = await Author.findOne({ name: args.author })
        const book = new Book({ ...args, author: author })

        await book.save()
        pubsub.publish("BOOK_ADDED", { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: error.message
        })
      }
    },

    addAuthor: async (root, args, context) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      try {
        author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
