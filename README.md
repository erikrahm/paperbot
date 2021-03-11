# GraphQL/REST/React Seed Project
Server: Apollo GraphQL/Express/REST Wrapper

Client: Apollo Client/React

## Seed Project Demo Quickstart
As a means for a quickstart this project has defaults already set up to use the Star Wars API (https://swapi.dev/). So you can clone this repo down and see a working GraphQL server which is consuming an external REST API, resolving that data, and making it queriable by our React frontend.

  1. Install dependencies for both server and client by running `yarn install-all` in the root of the project.
  2. Start up both projects by running `yarn start` in the root of the project`

## Seed Project setup

 1. Create `.env` file in your `./server` directory with the following env variables

    `GRAPHQL_PORT= *example: 4000 (default for a create react app)*`
    `API_URL= *example: https://swapi.dev/api/ (the URL for the REST API you'd like to call)*`
 
 2. Create a `.env.local` file in your `./client` directory with the following env variables:

    `GRAPHQL_URL= *example: http://localhost:4000/graphql*`

## Start the Seed Project

1. Install dependencies for both server and client by running `npm (or yarn) run install-all` in the root of the project.
2. Start up both projects by running `npm start` in the root of the project`