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
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Poem = {
  __typename?: 'Poem';
  _id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  authorID: Scalars['String'];
  author: Scalars['String'];
  createdAt: Scalars['String'];
  lastUpdated?: Maybe<Scalars['String']>;
  compliments: Scalars['Int'];
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
  checkUsernameAvailability: Scalars['Boolean'];
  currentUser: User;
  getBookByID?: Maybe<Book>;
  getCurrentUser: User;
  getPoemByID: Poem;
  getPoemsByAuthor?: Maybe<Array<Poem>>;
  getUserByID: User;
  login: Scalars['String'];
  searchBook?: Maybe<Array<Maybe<BookBase>>>;
};


export type QueryCheckUsernameAvailabilityArgs = {
  username: Scalars['String'];
};


export type QueryGetBookByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetPoemByIdArgs = {
  poemID: Scalars['ID'];
};


export type QueryGetPoemsByAuthorArgs = {
  authorID?: Maybe<Scalars['ID']>;
};


export type QueryGetUserByIdArgs = {
  userID: Scalars['ID'];
};


export type QueryLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySearchBookArgs = {
  searchString?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Scalars['String'];
  createPoem: Poem;
  complimentPoem: Scalars['String'];
  removePoemByID: Scalars['String'];
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreatePoemArgs = {
  title: Scalars['String'];
  content: Scalars['String'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};


export type MutationComplimentPoemArgs = {
  poemID: Scalars['ID'];
};


export type MutationRemovePoemByIdArgs = {
  poemID: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetHaikuQueryVariables = Exact<{
  poemID: Scalars['ID'];
}>;


export type GetHaikuQuery = (
  { __typename?: 'Query' }
  & { getPoemByID: (
    { __typename?: 'Poem' }
    & Pick<Poem, '_id' | 'title' | 'content' | 'author' | 'isPrivate'>
  ) }
);

export type SaveHaikuMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
}>;


export type SaveHaikuMutation = (
  { __typename?: 'Mutation' }
  & { createPoem: (
    { __typename?: 'Poem' }
    & Pick<Poem, '_id'>
  ) }
);

export type GetPoemsByAuthorQueryVariables = Exact<{
  authorID: Scalars['ID'];
}>;


export type GetPoemsByAuthorQuery = (
  { __typename?: 'Query' }
  & { getPoemsByAuthor?: Maybe<Array<(
    { __typename?: 'Poem' }
    & Pick<Poem, '_id' | 'title' | 'content' | 'author' | 'isPrivate' | 'createdAt'>
  )>> }
);

export type LoginQueryQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQueryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'login'>
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

export type RegistrationMutationMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegistrationMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

export type UsernameQueryQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UsernameQueryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkUsernameAvailability'>
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'email'>
  ) }
);


export const GetHaikuDocument = gql`
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

/**
 * __useGetHaikuQuery__
 *
 * To run a query within a React component, call `useGetHaikuQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHaikuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHaikuQuery({
 *   variables: {
 *      poemID: // value for 'poemID'
 *   },
 * });
 */
export function useGetHaikuQuery(baseOptions: Apollo.QueryHookOptions<GetHaikuQuery, GetHaikuQueryVariables>) {
        return Apollo.useQuery<GetHaikuQuery, GetHaikuQueryVariables>(GetHaikuDocument, baseOptions);
      }
export function useGetHaikuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHaikuQuery, GetHaikuQueryVariables>) {
          return Apollo.useLazyQuery<GetHaikuQuery, GetHaikuQueryVariables>(GetHaikuDocument, baseOptions);
        }
export type GetHaikuQueryHookResult = ReturnType<typeof useGetHaikuQuery>;
export type GetHaikuLazyQueryHookResult = ReturnType<typeof useGetHaikuLazyQuery>;
export type GetHaikuQueryResult = Apollo.QueryResult<GetHaikuQuery, GetHaikuQueryVariables>;
export const SaveHaikuDocument = gql`
    mutation SaveHaiku($title: String!, $content: String!, $isPrivate: Boolean!, $id: ID) {
  createPoem(title: $title, content: $content, isPrivate: $isPrivate, id: $id) {
    _id
  }
}
    `;
export type SaveHaikuMutationFn = Apollo.MutationFunction<SaveHaikuMutation, SaveHaikuMutationVariables>;

/**
 * __useSaveHaikuMutation__
 *
 * To run a mutation, you first call `useSaveHaikuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveHaikuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveHaikuMutation, { data, loading, error }] = useSaveHaikuMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      isPrivate: // value for 'isPrivate'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSaveHaikuMutation(baseOptions?: Apollo.MutationHookOptions<SaveHaikuMutation, SaveHaikuMutationVariables>) {
        return Apollo.useMutation<SaveHaikuMutation, SaveHaikuMutationVariables>(SaveHaikuDocument, baseOptions);
      }
export type SaveHaikuMutationHookResult = ReturnType<typeof useSaveHaikuMutation>;
export type SaveHaikuMutationResult = Apollo.MutationResult<SaveHaikuMutation>;
export type SaveHaikuMutationOptions = Apollo.BaseMutationOptions<SaveHaikuMutation, SaveHaikuMutationVariables>;
export const GetPoemsByAuthorDocument = gql`
    query GetPoemsByAuthor($authorID: ID!) {
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

/**
 * __useGetPoemsByAuthorQuery__
 *
 * To run a query within a React component, call `useGetPoemsByAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoemsByAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoemsByAuthorQuery({
 *   variables: {
 *      authorID: // value for 'authorID'
 *   },
 * });
 */
export function useGetPoemsByAuthorQuery(baseOptions: Apollo.QueryHookOptions<GetPoemsByAuthorQuery, GetPoemsByAuthorQueryVariables>) {
        return Apollo.useQuery<GetPoemsByAuthorQuery, GetPoemsByAuthorQueryVariables>(GetPoemsByAuthorDocument, baseOptions);
      }
export function useGetPoemsByAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoemsByAuthorQuery, GetPoemsByAuthorQueryVariables>) {
          return Apollo.useLazyQuery<GetPoemsByAuthorQuery, GetPoemsByAuthorQueryVariables>(GetPoemsByAuthorDocument, baseOptions);
        }
export type GetPoemsByAuthorQueryHookResult = ReturnType<typeof useGetPoemsByAuthorQuery>;
export type GetPoemsByAuthorLazyQueryHookResult = ReturnType<typeof useGetPoemsByAuthorLazyQuery>;
export type GetPoemsByAuthorQueryResult = Apollo.QueryResult<GetPoemsByAuthorQuery, GetPoemsByAuthorQueryVariables>;
export const LoginQueryDocument = gql`
    query LoginQuery($username: String!, $password: String!) {
  login(username: $username, password: $password)
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
export const RegistrationMutationDocument = gql`
    mutation RegistrationMutation($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email)
}
    `;
export type RegistrationMutationMutationFn = Apollo.MutationFunction<RegistrationMutationMutation, RegistrationMutationMutationVariables>;

/**
 * __useRegistrationMutationMutation__
 *
 * To run a mutation, you first call `useRegistrationMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrationMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrationMutationMutation, { data, loading, error }] = useRegistrationMutationMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegistrationMutationMutation(baseOptions?: Apollo.MutationHookOptions<RegistrationMutationMutation, RegistrationMutationMutationVariables>) {
        return Apollo.useMutation<RegistrationMutationMutation, RegistrationMutationMutationVariables>(RegistrationMutationDocument, baseOptions);
      }
export type RegistrationMutationMutationHookResult = ReturnType<typeof useRegistrationMutationMutation>;
export type RegistrationMutationMutationResult = Apollo.MutationResult<RegistrationMutationMutation>;
export type RegistrationMutationMutationOptions = Apollo.BaseMutationOptions<RegistrationMutationMutation, RegistrationMutationMutationVariables>;
export const UsernameQueryDocument = gql`
    query UsernameQuery($username: String!) {
  checkUsernameAvailability(username: $username)
}
    `;

/**
 * __useUsernameQueryQuery__
 *
 * To run a query within a React component, call `useUsernameQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsernameQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsernameQueryQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUsernameQueryQuery(baseOptions: Apollo.QueryHookOptions<UsernameQueryQuery, UsernameQueryQueryVariables>) {
        return Apollo.useQuery<UsernameQueryQuery, UsernameQueryQueryVariables>(UsernameQueryDocument, baseOptions);
      }
export function useUsernameQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsernameQueryQuery, UsernameQueryQueryVariables>) {
          return Apollo.useLazyQuery<UsernameQueryQuery, UsernameQueryQueryVariables>(UsernameQueryDocument, baseOptions);
        }
export type UsernameQueryQueryHookResult = ReturnType<typeof useUsernameQueryQuery>;
export type UsernameQueryLazyQueryHookResult = ReturnType<typeof useUsernameQueryLazyQuery>;
export type UsernameQueryQueryResult = Apollo.QueryResult<UsernameQueryQuery, UsernameQueryQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  getCurrentUser {
    _id
    username
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;