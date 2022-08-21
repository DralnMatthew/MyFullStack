const Book = require("./models/book");
const Author = require("./models/author");
const { AuthenticationError, UserInputError } = require("apollo-server");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return Book.find({
          $and: [
            {author: {$eq: Author.findOne({name: args.author})}},
            {genres: {$in: args.genre } },
          ],
        }).populate({path:'author', select: 'name'})
      } else if (args.author) {
        return Book.find({author: {$eq: Author.findOne({name: args.author})}}).populate({path:'author', select: 'name'})
      } else if (args.genre) {
        return Book.find({genres: {$in: args.genre}}).populate({path:'author', select: 'name'})
      } else {
        return Book.find({}).populate({path:'author', select: 'name'})
      }
    },
    allAuthors: async () => Author.find({}).populate({path:'bookOf'}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => root.bookOf.length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({name: {$eq: args.author}})
      let book
      if (!author) {
        const newAuthor = new Author({name: args.author})
        book = new Book({ author: newAuthor, title: args.title, genres: args.genres, published: args.published })
        newAuthor.bookOf = [book]
        try {
          await book.save()
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }
      book = new Book({ author: author, title: args.title, genres: args.genres, published: args.published })
      author.bookOf = author.bookOf.concat(book)
      try {
        await book.save()
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers