import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory, Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

import { Query as CurrentUserQuery, User } from "../generated/graphql";
import { checkAuth } from "../utils/authentication";
import { useIsMount } from "../utils/hooks";
import Button from "./library/Button";
import { Colors } from "../utils/constants";
import { UserContext } from "../utils/userContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Serif', serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 50px;
`;

const Logo = styled(Link)`
  text-decoration: none;

  h1 {
    font-family: "Permanent Marker", cursive;
    font-size: 40px;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: ${Colors.blue};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    getCurrentUser {
      _id
      username
      email
    }
  }
`;

const Wrapper: React.FC = ({ children }) => {
  const [userContextState, updateUserContextState] = useState<null | User>(
    null
  );
  const [
    fireCurrentUser,
    { loading, error, data },
  ] = useLazyQuery<CurrentUserQuery>(CURRENT_USER_QUERY);
  const isFirstRender = useIsMount();
  const browserHistory = useHistory();
  const hasToken = checkAuth();
  const isLoggedIn = data?.getCurrentUser && hasToken;

  useEffect(() => {
    if (checkAuth() && isFirstRender) {
      fireCurrentUser();
    }
  }, [fireCurrentUser, isFirstRender]);

  useEffect(() => {
    if (data?.getCurrentUser) {
      updateUserContextState(data?.getCurrentUser);
    }
  }, [data]);

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>Error :(</p>;
  }

  const handleLogout = () => {
    updateUserContextState(null);
    localStorage.clear();
    browserHistory.push("/login");
  };

  if (!hasToken) {
    return <Redirect to="/login" />;
  }

  return !loading ? (
    <>
      <GlobalStyle />
      <Header>
        <Logo to="/">
          <h1>Paperbot</h1>
        </Logo>
        <div>{`${data?.getCurrentUser?.username} - ${data?.getCurrentUser?.email}`}</div>
        {isLoggedIn && (
          <ButtonWrapper>
            <Button clickHandler={handleLogout}>Logout</Button>
          </ButtonWrapper>
        )}
      </Header>
      {data?.getCurrentUser && (
        <UserContext.Provider
          value={[userContextState, updateUserContextState]}
        >
          <main>{children}</main>
        </UserContext.Provider>
      )}
      <Footer></Footer>
    </>
  ) : (
    <div>Loading :P</div>
  );
};

export default Wrapper;
