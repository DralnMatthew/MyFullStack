// const { ApolloServer, gql } = require('apollo-server')
// const { v1: uuid } = require('uuid')
//
// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]
//
// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
// */
//
// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]
//
// const typeDefs = gql`
//   type Author {
//     name: String!
//     id: ID!
//     born: Int
//     bookCount: Int!
//   }
//
//   type Book {
//     title: String!
//     published: Int!
//     author: Author!
//     genres: [String!]!
//     id: ID!
//   }
//
//   type Query {
//     bookCount: Int!
//     authorCount: Int!
//     allBooks(author: String, genre: String): [Book!]!
//     allAuthors: [Author!]!
//   }
//
//   type Mutation {
//     addBook(
//       title: String!
//       author: String!
//       published: Int!
//       genres: [String!]!
//     ): Book!
//
//     editAuthor(
//       name: String!
//       setBornTo: Int!
//     ): Author
// }
// `
//
// const resolvers = {
//   Query: {
//     bookCount: () => books.length,
//     authorCount: () => authors.length,
//     allBooks: (root, args) => {
//       if (args.author && args.genre) return books.filter(b => (b.author === args.author && b.genres.includes(args.genre)))
//       else if (args.author) return books.filter(b => b.author === args.author)
//       else if (args.genre) return books.filter(b => b.genres.includes(args.genre))
//       else return books
//     },
//     allAuthors: () => authors
//   },
//   Author: {
//     bookCount: (root) => books.filter(b => b.author === root.name).length
//   },
//   Mutation: {
//     addBook: (root, args) => {
//       const book = { ...args, id: uuid() }
//       books = books.concat(book)
//       if (!authors.filter(a => a.name === args.author).length) authors = authors.concat({ name: args.author, id: uuid() })
//       return book
//     },
//
//     editAuthor: (root, args) => {
//       const author = authors.find(a => a.name === args.name)
//       if (!author) return null
//       const updatedAuthor = { ...author, born: args.setBornTo }
//       authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
//       return updatedAuthor
//     }
//   }
// }
//
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })
//
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })


const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const User = require('./models/user')

const mongoose = require('mongoose')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI =
  'mongodb+srv://DralnMatthew:DralnMatthew@cluster0.hb6opsv.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '',
    }
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()