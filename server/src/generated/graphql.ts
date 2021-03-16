import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
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
  searchBook?: Maybe<Array<Maybe<BookBase>>>;
  getBookByID?: Maybe<Book>;
  getCurrentUser: User;
  getUserByID: User;
  login: Scalars['String'];
  getPoemsByAuthor?: Maybe<Array<Poem>>;
  getPoemByID: Poem;
  checkUsernameAvailability: Scalars['Boolean'];
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


export type QueryGetPoemsByAuthorArgs = {
  authorID?: Maybe<Scalars['ID']>;
};


export type QueryGetPoemByIdArgs = {
  poemID: Scalars['ID'];
};


export type QueryCheckUsernameAvailabilityArgs = {
  username: Scalars['String'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Poem: ResolverTypeWrapper<Poem>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BookBase: ResolverTypeWrapper<BookBase>;
  BookPrice: ResolverTypeWrapper<BookPrice>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BookImages: ResolverTypeWrapper<BookImages>;
  Book: ResolverTypeWrapper<Book>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Poem: Poem;
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  BookBase: BookBase;
  BookPrice: BookPrice;
  Float: Scalars['Float'];
  BookImages: BookImages;
  Book: Book;
  Query: {};
  Mutation: {};
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PoemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Poem'] = ResolversParentTypes['Poem']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  authorID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  compliments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookBase'] = ResolversParentTypes['BookBase']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  coverPhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  averageRating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookPriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookPrice'] = ResolversParentTypes['BookPrice']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookImages'] = ResolversParentTypes['BookImages']> = {
  smallThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  small?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  medium?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  large?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extraLarge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  coverPhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  averageRating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  etag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  printType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mainCategory?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  ratingsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<ResolversTypes['BookImages'], ParentType, ContextType>;
  isEbook?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  listPrice?: Resolver<ResolversTypes['BookPrice'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  searchBook?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookBase']>>>, ParentType, ContextType, RequireFields<QuerySearchBookArgs, never>>;
  getBookByID?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QueryGetBookByIdArgs, never>>;
  getCurrentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  getUserByID?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userID'>>;
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'username' | 'password'>>;
  getPoemsByAuthor?: Resolver<Maybe<Array<ResolversTypes['Poem']>>, ParentType, ContextType, RequireFields<QueryGetPoemsByAuthorArgs, never>>;
  getPoemByID?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<QueryGetPoemByIdArgs, 'poemID'>>;
  checkUsernameAvailability?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUsernameAvailabilityArgs, 'username'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'username' | 'password' | 'email'>>;
  createPoem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<MutationCreatePoemArgs, 'title' | 'content'>>;
  complimentPoem?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationComplimentPoemArgs, 'poemID'>>;
  removePoemByID?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRemovePoemByIdArgs, 'poemID'>>;
};

export type Resolvers<ContextType = any> = {
  User?: UserResolvers<ContextType>;
  Poem?: PoemResolvers<ContextType>;
  BookBase?: BookBaseResolvers<ContextType>;
  BookPrice?: BookPriceResolvers<ContextType>;
  BookImages?: BookImagesResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
