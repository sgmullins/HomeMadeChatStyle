require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const connectDB = require('./configs/db');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const port = 5000;
// The `listen` method launches a web server.
server.listen({ port }).then(({ url }) => {
  connectDB();
  console.log(`🚀  Server ready at ${url}`);
});
