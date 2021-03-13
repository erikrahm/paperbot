import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { isNil } from "lodash";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import {
  Query as CheckUsernameQuery,
  Mutation as RegistrationMutation,
  MutationCreateUserArgs,
  QueryCheckUsernameAvailabilityArgs,
} from "../generated/graphql";
import { useIsMount } from "../utils/hooks";
import { RegisterValidation } from "../utils/validation";

const REGISTRATION_MUTATION = gql`
  mutation RegistrationMutation($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
    }
  }
`;

const USERNAME_QUERY = gql`
  query UsernameQuery($username: String!) {
    checkUsernameAvailability(username: $username)
  }
`;

const Registration: React.FC = () => {
  const [succesfulLogin, updateSucessfulLogin] = useState<boolean>(false);
  const [usernameAvailable, updateUsernameAvailable] = useState<
    undefined | boolean
  >(undefined);
  const isMount = useIsMount();
  const [fireUsernameCheck, { data: usernameData }] = useLazyQuery<
    CheckUsernameQuery,
    QueryCheckUsernameAvailabilityArgs
  >(USERNAME_QUERY);
  const [fireRegistration, { loading, error, data }] = useMutation<
    RegistrationMutation,
    MutationCreateUserArgs
  >(REGISTRATION_MUTATION);

  useEffect(() => {
    if (!isNil(usernameData?.checkUsernameAvailability)) {
      updateUsernameAvailable(usernameData?.checkUsernameAvailability);
    }
  }, [usernameData, isMount]);

  useEffect(() => {
    if (!isNil(data?.createUser.token) && !isMount) {
      localStorage.setItem("token", `${data?.createUser.token}`);
      updateSucessfulLogin(true);
    }
  }, [data, isMount]);

  if (succesfulLogin) return <Redirect to={{ pathname: "/" }} />;
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>Error :(</p>;
  }
  if (loading) return <p>Loading :P</p>;

  console.log("HMMM", usernameData?.checkUsernameAvailability);

  const handleUsername = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (inputValue.length >= 3) {
      fireUsernameCheck({ variables: { username: event.currentTarget.value } });
    }
  };

  const usernameValidation = () => {
    if (usernameAvailable === false) {
      return "That username is already taken.";
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={({ username, password }) => {
          fireRegistration({
            variables: { username: username, password: password },
          });
        }}
        validationSchema={RegisterValidation}
      >
        {({ handleSubmit, validateField }) => (
          <form onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                validate={usernameValidation}
                onKeyUp={handleUsername}
              />
              <ErrorMessage name="username" />
            </label>
            <label>
              <span>Password</span>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" />
            </label>
            <label>
              <span>Confirm Password</span>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" />
            </label>
            <button type="submit">Login</button>
          </form>
        )}
      </Formik>
      <div>
        <Link to="/login">- Or Login to am Existing Account -</Link>
      </div>
    </div>
  );
};

export default Registration;
