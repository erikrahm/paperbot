import {
  MutationResolvers,
  QueryResolvers,
  QuerySearchBookArgs,
  QueryGetBookByIdArgs,
} from "./generated/graphql";
import {
  IResolvers,
  AuthenticationError,
  UserInputError,
} from "apollo-server-express";
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
    getPoemsByAuthor: async (
      _,
      { authorID },
      { models: { poemModel }, currentUser }
    ) => {
      const isAuthor = isNil(authorID) && currentUser?.id;
      const author = isAuthor ? currentUser?.id : authorID;

      if (!author) {
        throw new AuthenticationError("User not authenticated.");
      }

      const filters = {
        authorID: author,
        removed: false,
        ...(!isAuthor && { isPrivate: false }),
      };

      const poems = await poemModel.find(filters).exec();

      if (!poems) {
        return null;
      }

      return poems;
    },
    getPoemByID: async (
      _,
      { poemID },
      { models: { poemModel }, currentUser }
    ) => {
      const poem = await poemModel
        .findOne({
          $or: [
            { isPrivate: true, _id: poemID, authorID: currentUser.id },
            { isPrivate: false, _id: poemID },
          ],
        })
        .exec();

      if (!poem) {
        throw new UserInputError("Invalid Poem request.");
      }

      return poem;
    },
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

      const user = await userModel.findById({ _id: currentUser.id }).exec();

      if (!user) {
        throw new UserInputError("User with that ID does not exist");
      }

      return user;
    },
    getUserByID: async (_, { userID }, { models: { userModel } }) => {
      const user = await userModel.findById({ _id: userID }).exec();

      if (!user) {
        throw new UserInputError("User with that ID does not exist");
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
      { username, password, email },
      { models: { userModel }, secret }
    ) => {
      const user = await userModel.create({
        username,
        password,
        email,
        createdAt: `${new Date()}`,
      });
      return signToken(user, secret);
    },
    createPoem: async (
      _,
      { title, content, isPrivate, id },
      { models: { poemModel }, currentUser }
    ) => {
      if (isNil(currentUser)) {
        throw new AuthenticationError("You are not authenticated");
      }

      if (id) {
        const retrievedPoem = await poemModel.findById({ _id: id }).exec();

        if (retrievedPoem.authorID != currentUser.id) {
          throw new AuthenticationError("You are not authenticated");
        }

        return await poemModel.findOneAndUpdate(
          { _id: id },
          { $set: { title, content, isPrivate, lastUpdated: new Date() } },
          { upsert: true, returnOriginal: true }
        );
      }

      return await poemModel.create({
        title,
        content,
        isPrivate: !isNil(isPrivate) ? isPrivate : false,
        authorID: currentUser.id,
        author: currentUser.username,
        removed: false,
        compliments: 0,
        createdAt: new Date(),
      });
    },
    complimentPoem: async (_, { poemID }, { models: { poemModel } }) => {
      await poemModel.findOneAndUpdate(
        { _id: poemID },
        { $inc: { compliments: 1 } }
      );
      return `Successfully Complimented ${poemID}`;
    },
    removePoemByID: async (_, { poemID }, { models: { poemModel } }) => {
      await poemModel.findOneAndUpdate(
        { _id: poemID },
        { $set: { removed: true } }
      );
      return `Successfully Removed ${poemID}`;
    },
  },
};
