const { ApolloServer, gql, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/Book");
const User = require("./models/user");
const mongoose = require("mongoose");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const MONGODB_URI =
  "mongodb+srv://mikep17:xxxxxxxxx@cluster0.qjigu.mongodb.net/part8db?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

mongoose.set("useFindAndModify", false);

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`;

// remember in the graphql playground, "allBooks{title, id, etc... }" is the proper query
// or you will get a cryptic error about "must have a selection of subfields"

// hardcoded for example purposes...
const JWT_SECRET = "SECRET_TOKEN";

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => {
      return Book.find({});
    },

    allAuthors: () => {
      return Author.find({});
    },

    me: (root, args, context) => {
      return context.currentUser;
      // note this will return null if there is no valid token in the header / not logged in
    },
  },

  Author: {
    bookCount: (root) => Book.countDocuments({ author: root }),
    // We must define bookCount for the Author object... so when we ask to return bookCount in AllAuthors
    // the query will be routed here, and this will count documents of "root", the root query type\
    // see https://graphql.org/learn/schema/
    name: async (root) => {
      authorObj = await Author.findById(root);
      return authorObj.name.toString();
    },
  },

  // END OF QUERIES

  // START OF MUTATIONS

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("you are not logged in");
      }

      // Try to find the author in our DB
      let author = await Author.findOne({ name: args.author });
      console.log("Does author exist?: ", author);

      // if not found, create author
      if (!author) {
        author = new Author({ name: args.author });
        console.log("!author, now does author exist?: ", author);
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      }

      // create new book w/ args, author field will be assigned the author object
      let newbook = new Book({ ...args, author: author });

      try {
        await newbook.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newbook });

      return newbook;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("you are not logged in");
      }

      const author = await Author.findOne({ name: args.name });
      if (author) {
        try {
          author.born = args.setBornTo;
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
        return author;
      } else {
        console.log("error editing author / author not found");
        return null;
      }
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      // if all is good, return the JWT token string
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
      // Note: the idea is logged in user adds a token in the HTTP headers to all of their requests
      // in graphQL playground the header is added to a query -- see 8.c for more info "User and log in"
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      // ok, hardcoded password just for demonstrative purpose
      // remember in reality we would use bcrypt to decode here...
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
      // If there is no user connected to the request, the value of the field is undefined.
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
