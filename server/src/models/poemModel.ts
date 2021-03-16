import { Schema, Document, model } from "mongoose";

export interface Poem {
  title: string;
  content: string;
  isPrivate: boolean;
  author: string;
  authorID: string;
  createdAt: Date;
  updatedAt: Date;
  removed: boolean;
  compliments: number;
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
    default: false,
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  compliments: {
    type: Number,
    required: true,
    default: 0,
  },
  removed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const poemModel = model("poem", poemSchema);

export default poemModel;
