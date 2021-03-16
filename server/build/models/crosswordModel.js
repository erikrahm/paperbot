"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var crosswordSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  structure: [{
    type: String,
    required: true
  }],
  solution: [{
    type: String,
    required: true
  }],
  isPrivate: {
    type: Boolean,
    required: true
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});
var crosswordModel = (0, _mongoose.model)("crossword", crosswordSchema);
var _default = crosswordModel;
exports.default = _default;