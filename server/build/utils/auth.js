"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var signToken = function signToken(user, secret) {
  return _jsonwebtoken.default.sign({
    id: user._id,
    username: user.username
  }, secret, {
    expiresIn: 24 * 10 * 50
  });
};

exports.signToken = signToken;