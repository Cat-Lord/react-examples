import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';
import { ChakraProvider } from '@chakra-ui/react';

const errorLink = onError((errorHandler) => {
  const { graphQLErrors, networkError } = errorHandler;

  graphQLErrors?.map((currentError: GraphQLError) => {
    console.log(`Graphql Error: ${currentError.message}\npath: ${currentError.path}`);
  })

  if (networkError) {
    console.log(`Graphql Error: ${networkError.message}\npath: ${networkError.cause}`);
  }

});

const graphqlServerLink = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:8080/graphql' })
])

const client = new ApolloClient({
  link: graphqlServerLink,
  cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <ApolloProvider client={client}>
    <ChakraProvider>

      <App />

    </ChakraProvider>
  </ApolloProvider >
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
