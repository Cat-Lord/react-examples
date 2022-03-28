import { ApolloServer, gql } from 'apollo-server';

// in tsconfig set 'useJsonModule' to true in order to import it here
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import { SessionAPI } from '../datasources/sessions';

const dataSources = () => ({
  SessionAPI: new SessionAPI()
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server
  .listen({
    // obtain port either from program arguments
    port: process.env.PORT || 8080
  })
  .then(({url}) => {
    console.log(`running on ${url}`);
  })