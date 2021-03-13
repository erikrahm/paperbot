import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthRoute } from "./utils/authentication";
import ApolloClient from "./components/ApolloClient";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import Haiku from "./components/Haiku";
import Login from "./components/Login";
import Registration from "./components/Registration";

const App = () => {
  return (
    <ApolloClient>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Wrapper>
            <AuthRoute exact path="/">
              <Home />
            </AuthRoute>
            <AuthRoute exact path="/haiku">
              <Haiku />
            </AuthRoute>
          </Wrapper>
        </Switch>
      </BrowserRouter>
    </ApolloClient>
  );
};

export default App;
