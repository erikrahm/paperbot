"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var poemSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  authorID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date
  },
  compliments: {
    type: Number,
    required: true,
    default: 0
  },
  removed: {
    type: Boolean,
    required: true,
    default: false
  }
});
var poemModel = (0, _mongoose.model)("poem", poemSchema);
var _default = poemModel;
exports.default = _default;