module.exports = {
  schema: [
    process.env.GRAPHQL_URL || "http://localhost:4000/graphql",
    "./src/utils/localSchema.graphql",
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./src/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
