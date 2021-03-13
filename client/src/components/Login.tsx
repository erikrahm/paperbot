import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { isNil } from "lodash";
import { gql, useLazyQuery } from "@apollo/client";

import { Query as LoginQuery, QueryLoginArgs } from "../generated/graphql";
import { useIsMount } from "../utils/hooks";
import { LoginValidation } from "../utils/validation";

const LOGIN_QUERY = gql`
  query LoginQuery($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Login: React.FC = () => {
  const [succesfulLogin, updateSucessfulLogin] = useState(false);
  const isMount = useIsMount();
  const [fireLogin, { client, loading, error, data }] = useLazyQuery<
    LoginQuery,
    QueryLoginArgs
  >(LOGIN_QUERY);

  useEffect(() => {
    client?.resetStore();
  });

  useEffect(() => {
    if (!isNil(data?.login.token) && !isMount) {
      localStorage.setItem("token", `${data?.login.token}`);
      updateSucessfulLogin(true);
    }
  }, [data, isMount]);

  if (succesfulLogin) return <Redirect to={{ pathname: "/" }} />;
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>Error :(</p>;
  }
  if (loading) return <p>Loading :P</p>;

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={({ username, password }) => {
          fireLogin({ variables: { username: username, password: password } });
        }}
        validationSchema={LoginValidation}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" />
            </label>
            <label>
              <span>Password</span>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" />
            </label>
            <button type="submit">Login</button>
          </form>
        )}
      </Formik>
      <div>
        <Link to="/registration">- Or Register a New Account -</Link>
      </div>
    </div>
  );
};

export default Login;
