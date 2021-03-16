import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import {
  Query as HaikusQuery,
  QueryGetPoemsByAuthorArgs,
} from "../generated/graphql";
import HaikuDisplayView from "./Haiku/HaikuDisplayView";
import { HaikuWrapper } from "./Haiku/Haiku";
import { Colors } from "../utils/constants";

const PoemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 800px;
  margin: 0 auto;
`;

const HAIKUS_QUERY = gql`
  query GetPoemsByAuthor($authorID: ID) {
    getPoemsByAuthor(authorID: $authorID) {
      _id
      title
      content
      author
      isPrivate
      createdAt
    }
  }
`;

const Home: React.FC = ({ children }) => {
  const { error, data, loading } = useQuery<
    HaikusQuery,
    QueryGetPoemsByAuthorArgs
  >(HAIKUS_QUERY, {
    fetchPolicy: "network-only",
  });

  if (error) {
    console.log("ERROR: ", JSON.stringify(error, null, 2));
    return <div>Error :(</div>;
  }
  if (loading)
    return <Loader type="Puff" color={Colors.blue} height={100} width={100} />;

  return data?.getPoemsByAuthor ? (
    <PoemsWrapper>
      {data?.getPoemsByAuthor.map((poem) => (
        <HaikuWrapper key={poem._id}>
          <HaikuDisplayView id={poem._id} poem={poem} />
        </HaikuWrapper>
      ))}
    </PoemsWrapper>
  ) : null;
};

export default Home;
