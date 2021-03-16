import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import { cache } from "../utils/cache";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions?.code === "UNAUTHENTICATED") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const combinedLink = from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: combinedLink,
});

const ApolloClientComponent: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloClientComponent;
