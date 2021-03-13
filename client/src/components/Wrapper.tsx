import React, { useEffect, useMemo, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { isNil } from "lodash";
import { createGlobalStyle } from "styled-components";

import { Query as CurrentUserQuery } from "../generated/graphql";
import { checkAuth } from "../utils/authentication";
import { userVar } from "../utils/cache";
import { useIsMount } from "../utils/hooks";
import Button from "./library/Button";
import { Colors } from "../utils/constants";

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

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 40px;
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: ${Colors.blue};
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
      username
    }
  }
`;

const CACHED_USER_QUERY = gql`
  query CurrentCachedUser {
    currentUser @client {
      username
    }
  }
`;

const Wrapper: React.FC = ({ children }) => {
  const [
    fireCurrentUser,
    { loading, error, data },
  ] = useLazyQuery<CurrentUserQuery>(CURRENT_USER_QUERY);
  const [fireCachedUser] = useLazyQuery(CACHED_USER_QUERY);
  const isFirstRender = useIsMount();
  const browserHistory = useHistory();
  const currentUser = userVar();
  const isLoggedIn = currentUser || data?.getCurrentUser;

  useEffect(() => {
    if (isNil(currentUser) && checkAuth() && isFirstRender) {
      fireCurrentUser();
    }
  }, [currentUser, fireCurrentUser, isFirstRender]);

  useEffect(() => {
    if (data?.getCurrentUser.username) {
      userVar(data.getCurrentUser);
      fireCachedUser();
    }
  }, [data, fireCachedUser]);

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>Error :(</p>;
  }

  const handleLogout = () => {
    localStorage.clear();
    browserHistory.push("/login");
  };

  console.log(currentUser);

  return !loading ? (
    <>
      <GlobalStyle />
      <Header>
        <Logo>Paperbot</Logo>
        <div>{currentUser?.username}</div>
        {isLoggedIn && (
          <ButtonWrapper>
            <Button clickHandler={handleLogout}>Logout</Button>
          </ButtonWrapper>
        )}
      </Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  ) : (
    <div>Loading :P</div>
  );
};

export default Wrapper;
