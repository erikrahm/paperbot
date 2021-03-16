import bcrypt from "bcrypt";
import { Schema, Document, model } from "mongoose";

export interface User {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

export interface UserMongo extends User {
  _id: string;
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
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const userModel = model("user", userSchema);

export default userModel;
