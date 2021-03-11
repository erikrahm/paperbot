import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { User } from "../generated/graphql";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentUser: {
          read() {
            return userVar();
          },
        },
      },
    },
  },
});

/**
 * Set initial values when we create cache variables.
 */

export const userVar: ReactiveVar<User | null> = makeVar<User | null>(null);
