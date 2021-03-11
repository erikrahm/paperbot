import React, { useState, useEffect, useMemo } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import {
  Query as SampleQuery,
  QuerySearchBookArgs,
} from "../generated/graphql";
import { usePrevious } from "../utils/hooks";

const SAMPLE_QUERY = gql`
  query AutocompleteSearch($searchString: String) {
    searchBook(searchString: $searchString) {
      id
      title
      authors
      coverPhoto
    }
  }
`;

const Person: React.FC = () => {
  const [searchTerm, updateSearchTerm] = useState("");
  const previousSearchTerm = usePrevious(searchTerm);
  const [fireSearch, { loading, error, data, called }] = useLazyQuery<
    SampleQuery,
    QuerySearchBookArgs
  >(SAMPLE_QUERY);
  const hasBooks = useMemo(() => !!data?.searchBook?.length, [data]);

  useEffect(() => {
    if (searchTerm !== previousSearchTerm && searchTerm.length > 3) {
      fireSearch({ variables: { searchString: searchTerm } });
    }
  }, [searchTerm, previousSearchTerm, fireSearch]);

  console.log(error);
  if (error) return <p>Error :(</p>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(event.currentTarget.value);
  };

  console.log("DATA: ", data, hasBooks);

  return (
    <div>
      <header>
        <input type="text" onChange={handleChange} />
        {loading && <h3>loading...</h3>}
        {!loading && called && !hasBooks && <div>No Results :(</div>}
        {!loading && hasBooks && (
          <div>
            {data?.searchBook?.map((book) => (
              <div key={book?.id}>{book?.title}</div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default Person;
