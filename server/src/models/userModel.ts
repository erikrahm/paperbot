import bcrypt from "bcrypt";
import { Schema, Document, model } from "mongoose";

import { Poem } from "./poemModel";
import { Crossword } from "./crosswordModel";

export interface User {
  username: string;
  password: string;
  poems: Poem[];
  crosswords: Crossword[];
}

export interface UserMongo extends User {
  id: string;
}

export interface UserDocument extends User, Document {}

const userSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  poems: [
    {
      type: Schema.Types.ObjectId,
      ref: "poem",
    },
  ],
  crosswords: [
    {
      type: Schema.Types.ObjectId,
      ref: "crossword",
    },
  ],
});

userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const userModel = model("user", userSchema);

export default userModel;
