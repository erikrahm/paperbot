import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  poems: Array<Poem>;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type Poem = {
  __typename?: 'Poem';
  title: Scalars['String'];
  content: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  author: User;
};

export type BookBase = {
  __typename?: 'BookBase';
  id: Scalars['String'];
  title: Scalars['String'];
  authors?: Maybe<Array<Scalars['String']>>;
  coverPhoto: Scalars['String'];
  language: Scalars['String'];
  averageRating: Scalars['Int'];
};

export type BookPrice = {
  __typename?: 'BookPrice';
  amount: Scalars['Float'];
  currencyCode: Scalars['String'];
};

export type BookImages = {
  __typename?: 'BookImages';
  smallThumbnail?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  large?: Maybe<Scalars['String']>;
  extraLarge?: Maybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['String'];
  title: Scalars['String'];
  authors?: Maybe<Array<Scalars['String']>>;
  coverPhoto: Scalars['String'];
  language: Scalars['String'];
  averageRating: Scalars['Int'];
  etag: Scalars['String'];
  publisher: Scalars['String'];
  publishedDate: Scalars['String'];
  description: Scalars['String'];
  pageCount: Scalars['Int'];
  printType: Scalars['String'];
  mainCategory: Scalars['String'];
  categories?: Maybe<Array<Scalars['String']>>;
  ratingsCount: Scalars['Int'];
  images: BookImages;
  isEbook: Scalars['Boolean'];
  listPrice: BookPrice;
};

export type Query = {
  __typename?: 'Query';
  searchBook?: Maybe<Array<Maybe<BookBase>>>;
  getBookByID?: Maybe<Book>;
  getCurrentUser: User;
  getUserByID: User;
  login: Token;
  getPoemByID: Poem;
};


export type QuerySearchBookArgs = {
  searchString?: Maybe<Scalars['String']>;
};


export type QueryGetBookByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUserByIdArgs = {
  userID: Scalars['ID'];
};


export type QueryLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type QueryGetPoemByIdArgs = {
  poemID: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Token;
  createPoem: Poem;
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreatePoemArgs = {
  title: Scalars['String'];
  content: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type LoginQueryQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQueryQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  ) }
);

export type AutocompleteSearchQueryVariables = Exact<{
  searchString?: Maybe<Scalars['String']>;
}>;


export type AutocompleteSearchQuery = (
  { __typename?: 'Query' }
  & { searchBook?: Maybe<Array<Maybe<(
    { __typename?: 'BookBase' }
    & Pick<BookBase, 'id' | 'title' | 'authors' | 'coverPhoto'>
  )>>> }
);


export const LoginQueryDocument = gql`
    query LoginQuery($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
    `;

/**
 * __useLoginQueryQuery__
 *
 * To run a query within a React component, call `useLoginQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQueryQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQueryQuery(baseOptions: Apollo.QueryHookOptions<LoginQueryQuery, LoginQueryQueryVariables>) {
        return Apollo.useQuery<LoginQueryQuery, LoginQueryQueryVariables>(LoginQueryDocument, baseOptions);
      }
export function useLoginQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQueryQuery, LoginQueryQueryVariables>) {
          return Apollo.useLazyQuery<LoginQueryQuery, LoginQueryQueryVariables>(LoginQueryDocument, baseOptions);
        }
export type LoginQueryQueryHookResult = ReturnType<typeof useLoginQueryQuery>;
export type LoginQueryLazyQueryHookResult = ReturnType<typeof useLoginQueryLazyQuery>;
export type LoginQueryQueryResult = Apollo.QueryResult<LoginQueryQuery, LoginQueryQueryVariables>;
export const AutocompleteSearchDocument = gql`
    query AutocompleteSearch($searchString: String) {
  searchBook(searchString: $searchString) {
    id
    title
    authors
    coverPhoto
  }
}
    `;

/**
 * __useAutocompleteSearchQuery__
 *
 * To run a query within a React component, call `useAutocompleteSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useAutocompleteSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutocompleteSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useAutocompleteSearchQuery(baseOptions?: Apollo.QueryHookOptions<AutocompleteSearchQuery, AutocompleteSearchQueryVariables>) {
        return Apollo.useQuery<AutocompleteSearchQuery, AutocompleteSearchQueryVariables>(AutocompleteSearchDocument, baseOptions);
      }
export function useAutocompleteSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AutocompleteSearchQuery, AutocompleteSearchQueryVariables>) {
          return Apollo.useLazyQuery<AutocompleteSearchQuery, AutocompleteSearchQueryVariables>(AutocompleteSearchDocument, baseOptions);
        }
export type AutocompleteSearchQueryHookResult = ReturnType<typeof useAutocompleteSearchQuery>;
export type AutocompleteSearchLazyQueryHookResult = ReturnType<typeof useAutocompleteSearchLazyQuery>;
export type AutocompleteSearchQueryResult = Apollo.QueryResult<AutocompleteSearchQuery, AutocompleteSearchQueryVariables>;