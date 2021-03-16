import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import {
  Query as HaikuQuery,
  QueryGetPoemByIdArgs,
} from "../../generated/graphql";
import HaikuDisplayView from "./HaikuDisplayView";
import HaikuEditView from "./HaikuEditView";

const HAIKU_QUERY = gql`
  query GetHaiku($poemID: ID!) {
    getPoemByID(poemID: $poemID) {
      _id
      title
      content
      author
      isPrivate
    }
  }
`;

export const HaikuWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
`;

type HaikuProps = {
  edit?: boolean;
};

const Haiku: React.FC<HaikuProps> = ({ edit = false }) => {
  const { poemID } = useParams<{ poemID: string }>();
  const [fireHaikuQuery, { error, data, loading }] = useLazyQuery<
    HaikuQuery,
    QueryGetPoemByIdArgs
  >(HAIKU_QUERY, {
    variables: { poemID },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (poemID) {
      fireHaikuQuery({ variables: { poemID } });
    }
  }, [poemID, fireHaikuQuery]);

  if (error) {
    console.log("ERROR: ", JSON.stringify(error, null, 2));
    return <div>Error :(</div>;
  }
  if (loading) return <div>Loading :P</div>;

  return (
    <HaikuWrapper>
      <h1>Haiku</h1>
      {poemID && !edit && data ? (
        <HaikuDisplayView id={poemID} poem={data.getPoemByID} />
      ) : (
        <HaikuEditView poem={edit && data ? data.getPoemByID : undefined} />
      )}
    </HaikuWrapper>
  );
};

export default Haiku;
