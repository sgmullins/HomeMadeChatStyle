require('dotenv').config();
const { ApolloServer, PubSub } = require('apollo-server');
const connectDB = require('./configs/db');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  /* can/should place our models here in context as it makes testing easier, you would be able 
  to remove the import at the top of resolvers file and just pass context on the resolvers that need it
  ex. context: {
    models: {
      project: project.models
      task: task.models
    }, 
    loaders: loaders()

    then in resolver ctx.models.project
  }
  */
  context: ({ req }) => ({ req, pubsub }),
});

const port = 5000;
// The `listen` method launches a web server.
server.listen({ port }).then(({ url }) => {
  connectDB();
  console.log(`🚀  Server ready at ${url}`);
});
