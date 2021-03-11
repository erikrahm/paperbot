import { Schema, Document, model } from "mongoose";
import { User } from "./userModel";

export interface Crossword {
  title: string;
  structure: string[];
  solution: string[];
  isPrivate: boolean;
  author: User;
}

export interface CrosswordDocument extends Crossword, Document {}

const crosswordSchema: Schema<CrosswordDocument> = new Schema({
  title: {
    type: String,
    required: true,
  },
  structure: [
    {
      type: String,
      required: true,
    },
  ],
  solution: [
    {
      type: String,
      required: true,
    },
  ],
  isPrivate: {
    type: Boolean,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const crosswordModel = model("crossword", crosswordSchema);

export default crosswordModel;
