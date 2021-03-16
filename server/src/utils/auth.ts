import { Request } from "express";
import jwt from "jsonwebtoken";

import { UserMongo } from "../models/userModel";

interface GenericObject {
  [key: string]: unknown;
}

export interface AuthRequest extends Request {
  user: string | GenericObject; // or any other type
}

export const signToken = (user: UserMongo, secret: string) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: 24 * 10 * 50,
  });
};
