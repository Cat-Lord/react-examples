import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink
} from "@apollo/client";
import { ErrorResponse, onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';

const errorLink = onError((error: ErrorResponse) => {
  if (error.graphQLErrors) {
    error.graphQLErrors.map((currentError: GraphQLError) => {
      const formattedError = currentError.toJSON();

      alert(`Graphql Error: ${formattedError.message}\npath: ${formattedError.path}`)
    })
  }
})

const graphqlServerLink = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:8080/graphql' })
])

const client = new ApolloClient({
  link: graphqlServerLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
