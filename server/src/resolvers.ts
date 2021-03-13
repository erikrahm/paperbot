import {
  MutationResolvers,
  QueryResolvers,
  QuerySearchBookArgs,
  QueryGetBookByIdArgs,
} from "./generated/graphql";
import { IResolvers, AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { isNil } from "lodash";

import { signToken } from "./utils/auth";

interface Resolvers extends IResolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

// Define your custom Query and Mutation resolvers here
export const resolvers: Resolvers = {
  Query: {
    searchBook: async (
      _,
      { searchString }: QuerySearchBookArgs,
      { dataSources }
    ) => {
      return dataSources.externalAPI.searchBook(searchString);
    },
    getBookByID: (_, { id }: QueryGetBookByIdArgs, { dataSources }) =>
      dataSources.externalAPI.getBookByID(id),
    login: async (
      _,
      { username, password },
      { models: { userModel }, secret }
    ) => {
      const user = await userModel.findOne({ username }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      return signToken(user, secret);
    },
    getCurrentUser: async (_, __, { models: { userModel }, currentUser }) => {
      if (isNil(currentUser)) {
        throw new AuthenticationError(
          "User must be logged in to get current user"
        );
      }
      console.log("RSOLVER USER: ", JSON.stringify(currentUser));

      const user = await userModel.findById({ _id: currentUser.id }).exec();

      if (!user) {
        throw new AuthenticationError("User with that ID does not exist");
      }

      return user;
    },
    getUserByID: async (_, { userID }, { models: { userModel } }) => {
      const user = await userModel.findById({ _id: userID }).exec();

      if (!user) {
        throw new AuthenticationError("User with that ID does not exist");
      }

      return user;
    },
    checkUsernameAvailability: async (
      _,
      { username },
      { models: { userModel } }
    ) => {
      const userExists = await userModel.findOne({ username }).exec();
      return !userExists;
    },
  },
  Mutation: {
    createUser: async (
      _,
      { username, password },
      { models: { userModel }, secret }
    ) => {
      const user = await userModel.create({ username, password });
      return signToken(user, secret);
    },
    createPoem: async (
      _,
      { title, content, isPrivate },
      { models: { poemModel }, currentUser }
    ) => {
      if (isNil(currentUser)) {
        throw new AuthenticationError("You are not authenticated");
      }
      const poem = await poemModel.create({
        title,
        content,
        isPrivate: !isNil(isPrivate) ? isPrivate : false,
        author: currentUser.id,
      });
      return poem;
    },
  },
};
