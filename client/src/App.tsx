import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthRoute } from "./utils/authentication";
import { cache } from "./utils/cache";
import Home from "./components/Home";
import Haiku from "./components/Haiku";
import Login from "./components/Login";

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

const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: authLink.concat(httpLink),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <AuthRoute exact path="/">
              <Home />
            </AuthRoute>
            <AuthRoute exact path="/haiku">
              <Haiku />
            </AuthRoute>
          </Switch>
        </BrowserRouter>
      </main>
    </ApolloProvider>
  );
};

export default App;
