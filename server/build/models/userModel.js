"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});
userSchema.pre("save", function () {
  var hashedPassword = _bcrypt.default.hashSync(this.password, 12);

  this.password = hashedPassword;
});
var userModel = (0, _mongoose.model)("user", userSchema);
var _default = userModel;
exports.default = _default;