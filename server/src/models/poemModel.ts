import { Schema, Document, model } from "mongoose";
import { User } from "./userModel";

export interface Poem {
  title: string;
  content: string;
  isPrivate: boolean;
  author: User;
}

export interface PoemDocument extends Poem, Document {}

const poemSchema: Schema<PoemDocument> = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const poemModel = model("poem", poemSchema);

export default poemModel;
