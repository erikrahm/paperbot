import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
  const [fireLogin, { loading, error, data }] = useLazyQuery<
    LoginQuery,
    QueryLoginArgs
  >(LOGIN_QUERY);

  useEffect(() => {
    console.log(data);
    if (!isNil(data?.login.token) && !isMount) {
      localStorage.setItem("token", `${data?.login.token}`);
      updateSucessfulLogin(true);
    }
  }, [data, isMount]);

  if (succesfulLogin) return <Redirect to={{ pathname: "/" }} />;
  console.log(JSON.stringify(error, null, 2));
  if (error) return <p>Error :(</p>;
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
              <Field type="test" name="username" placeholder="Username" />
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
    </div>
  );
};

export default Login;