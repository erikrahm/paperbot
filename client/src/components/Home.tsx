import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { isNil } from "lodash";

import { Query as CurrentUserQuery } from "../generated/graphql";
import { checkAuth } from "../utils/authentication";
import { userVar } from "../utils/cache";
import Haiku from "./Haiku";

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    getCurrentUser {
      username
    }
    currentUser @client
  }
`;

const Home: React.FC = () => {
  const [
    fireCurrentUser,
    { client, loading, error, data },
  ] = useLazyQuery<CurrentUserQuery>(CURRENT_USER_QUERY);
  const browserHistory = useHistory();
  const currentUser = userVar();

  useEffect(() => {
    if (isNil(currentUser) && checkAuth()) {
      fireCurrentUser();
    }
  }, [currentUser, fireCurrentUser]);

  useEffect(() => {
    if (data?.getCurrentUser.username) {
      userVar(data.getCurrentUser);
    }
  }, [data]);

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>Error :(</p>;
  }

  const handleLogout = () => {
    localStorage.clear();
    client?.resetStore();
    browserHistory.push("/");
  };

  return !loading ? (
    <div>
      <header>
        <h1>Paperbot</h1>
        <div>{currentUser?.username}</div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <Haiku />
    </div>
  ) : (
    <div>Loading :P</div>
  );
};

export default Home;
