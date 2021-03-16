"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Models = void 0;

var _crosswordModel = _interopRequireDefault(require("./crosswordModel"));

var _poemModel = _interopRequireDefault(require("./poemModel"));

var _userModel = _interopRequireDefault(require("./userModel"));

var Models = {
  crosswordModel: _crosswordModel.default,
  poemModel: _poemModel.default,
  userModel: _userModel.default
};
exports.Models = Models;