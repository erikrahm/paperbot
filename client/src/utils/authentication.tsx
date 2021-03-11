import { Route, Redirect } from "react-router-dom";

export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export const AuthRoute = ({ children, ...props }: any) => (
  <Route
    {...props}
    render={() =>
      checkAuth() ? children : <Redirect to={{ pathname: "/login" }} />
    }
  />
);
