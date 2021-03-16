import React, { Dispatch, SetStateAction } from "react";

import { User } from "../generated/graphql";

export const UserContext = React.createContext<
  [] | [User | null, Dispatch<SetStateAction<User | null>>]
>([]);
