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
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 24 * 10 * 50,
  });
  return {
    token: token,
  };
};
