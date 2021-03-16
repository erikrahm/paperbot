import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApolloServer, gql } from "apollo-server-express";

import { DataSource } from "./datasource";
import { typeDefs } from "./graphql-schema";
import { resolvers } from "./resolvers";
import { Models } from "./models";
import { AuthRequest } from "./utils/auth";

// Graph our environment variables from our .env file and create a variable for our JWT secret
dotenv.config();

const PORT = process.env.GRAPHQL_PORT || 4000;
const DB_URI = `mongodb+srv://mongod:${encodeURIComponent(
  process.env.MONGO_DB_PASSWORD
)}@cluster0.kmlvn.mongodb.net/paperbot?retryWrites=true&w=majority`;
const SECRET = process.env.JWT_SECRET;

// Create express app
const app = express();

// Custom middleware to add a user object to the server requests
const injectUser = async (req: AuthRequest) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user = await jwt.verify(token, SECRET);
      if (typeof user === "object") req.user = { ...user };
    } catch (error) {
      console.error("FUKED", error);
    }
  }
  req.next();
};

// Add Middleware to our Express server
app.use(cors());
app.use(injectUser);

// Create a new apollo server instance and provide our Datasource to be accessed in our resolvers
const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  dataSources: () => ({
    externalAPI: new DataSource(),
  }),
  context: async ({ req }: { req: AuthRequest }) => {
    if (req) {
      return {
        models: Models,
        secret: SECRET,
        currentUser: req.user,
      };
    }
  },
  playground: true,
});

// Applying middleware to the newly created Apollo Server and
// specify a queriable path (also where GraphQL Playground will display in browser)
server.applyMiddleware({ app, path: "/graphql" });

// Open up a port and start the express server on it
app.listen({ port: PORT }, async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Server live at localhost:${PORT}/graphql`);
});
