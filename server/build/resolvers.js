"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _lodash = require("lodash");

var _auth = require("./utils/auth");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Define your custom Query and Mutation resolvers here
var resolvers = {
  Query: {
    searchBook: function () {
      var _searchBook = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, _ref, _ref2) {
        var searchString, dataSources;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searchString = _ref.searchString;
                dataSources = _ref2.dataSources;
                return _context.abrupt("return", dataSources.externalAPI.searchBook(searchString));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function searchBook(_x, _x2, _x3) {
        return _searchBook.apply(this, arguments);
      }

      return searchBook;
    }(),
    getBookByID: function getBookByID(_, _ref3, _ref4) {
      var id = _ref3.id;
      var dataSources = _ref4.dataSources;
      return dataSources.externalAPI.getBookByID(id);
    },
    getPoemsByAuthor: function () {
      var _getPoemsByAuthor = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, _ref5, _ref6) {
        var authorID, poemModel, currentUser, isAuthor, author, filters, poems;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                authorID = _ref5.authorID;
                poemModel = _ref6.models.poemModel, currentUser = _ref6.currentUser;
                isAuthor = (0, _lodash.isNil)(authorID) && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id);
                author = isAuthor ? currentUser === null || currentUser === void 0 ? void 0 : currentUser.id : authorID;

                if (author) {
                  _context2.next = 6;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("User not authenticated.");

              case 6:
                filters = _objectSpread({
                  authorID: author,
                  removed: false
                }, !isAuthor && {
                  isPrivate: false
                });
                _context2.next = 9;
                return poemModel.find(filters).exec();

              case 9:
                poems = _context2.sent;

                if (poems) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", null);

              case 12:
                return _context2.abrupt("return", poems);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getPoemsByAuthor(_x4, _x5, _x6) {
        return _getPoemsByAuthor.apply(this, arguments);
      }

      return getPoemsByAuthor;
    }(),
    getPoemByID: function () {
      var _getPoemByID = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, _ref7, _ref8) {
        var poemID, poemModel, currentUser, poem;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                poemID = _ref7.poemID;
                poemModel = _ref8.models.poemModel, currentUser = _ref8.currentUser;
                _context3.next = 4;
                return poemModel.findOne({
                  $or: [{
                    isPrivate: true,
                    _id: poemID,
                    authorID: currentUser.id
                  }, {
                    isPrivate: false,
                    _id: poemID
                  }]
                }).exec();

              case 4:
                poem = _context3.sent;

                if (poem) {
                  _context3.next = 7;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("Invalid Poem request.");

              case 7:
                return _context3.abrupt("return", poem);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getPoemByID(_x7, _x8, _x9) {
        return _getPoemByID.apply(this, arguments);
      }

      return getPoemByID;
    }(),
    login: function () {
      var _login = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, _ref9, _ref10) {
        var username, password, userModel, secret, user, matchPasswords;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                username = _ref9.username, password = _ref9.password;
                userModel = _ref10.models.userModel, secret = _ref10.secret;
                _context4.next = 4;
                return userModel.findOne({
                  username
                }).exec();

              case 4:
                user = _context4.sent;

                if (user) {
                  _context4.next = 7;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("Invalid credentials");

              case 7:
                matchPasswords = _bcrypt.default.compareSync(password, user.password);

                if (matchPasswords) {
                  _context4.next = 10;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("Invalid credentials");

              case 10:
                return _context4.abrupt("return", (0, _auth.signToken)(user, secret));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function login(_x10, _x11, _x12) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    getCurrentUser: function () {
      var _getCurrentUser = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, __, _ref11) {
        var userModel, currentUser, user;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userModel = _ref11.models.userModel, currentUser = _ref11.currentUser;

                if (!(0, _lodash.isNil)(currentUser)) {
                  _context5.next = 3;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("User must be logged in to get current user");

              case 3:
                _context5.next = 5;
                return userModel.findById({
                  _id: currentUser.id
                }).exec();

              case 5:
                user = _context5.sent;

                if (user) {
                  _context5.next = 8;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("User with that ID does not exist");

              case 8:
                return _context5.abrupt("return", user);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getCurrentUser(_x13, _x14, _x15) {
        return _getCurrentUser.apply(this, arguments);
      }

      return getCurrentUser;
    }(),
    getUserByID: function () {
      var _getUserByID = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_, _ref12, _ref13) {
        var userID, userModel, user;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userID = _ref12.userID;
                userModel = _ref13.models.userModel;
                _context6.next = 4;
                return userModel.findById({
                  _id: userID
                }).exec();

              case 4:
                user = _context6.sent;

                if (user) {
                  _context6.next = 7;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("User with that ID does not exist");

              case 7:
                return _context6.abrupt("return", user);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getUserByID(_x16, _x17, _x18) {
        return _getUserByID.apply(this, arguments);
      }

      return getUserByID;
    }(),
    checkUsernameAvailability: function () {
      var _checkUsernameAvailability = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_, _ref14, _ref15) {
        var username, userModel, userExists;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                username = _ref14.username;
                userModel = _ref15.models.userModel;
                _context7.next = 4;
                return userModel.findOne({
                  username
                }).exec();

              case 4:
                userExists = _context7.sent;
                return _context7.abrupt("return", !userExists);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function checkUsernameAvailability(_x19, _x20, _x21) {
        return _checkUsernameAvailability.apply(this, arguments);
      }

      return checkUsernameAvailability;
    }()
  },
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_, _ref16, _ref17) {
        var username, password, email, userModel, secret, user;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                username = _ref16.username, password = _ref16.password, email = _ref16.email;
                userModel = _ref17.models.userModel, secret = _ref17.secret;
                _context8.next = 4;
                return userModel.create({
                  username,
                  password,
                  email,
                  createdAt: `${new Date()}`
                });

              case 4:
                user = _context8.sent;
                return _context8.abrupt("return", (0, _auth.signToken)(user, secret));

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function createUser(_x22, _x23, _x24) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }(),
    createPoem: function () {
      var _createPoem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(_, _ref18, _ref19) {
        var title, content, isPrivate, id, poemModel, currentUser, retrievedPoem;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                title = _ref18.title, content = _ref18.content, isPrivate = _ref18.isPrivate, id = _ref18.id;
                poemModel = _ref19.models.poemModel, currentUser = _ref19.currentUser;

                if (!(0, _lodash.isNil)(currentUser)) {
                  _context9.next = 4;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("You are not authenticated");

              case 4:
                if (!id) {
                  _context9.next = 13;
                  break;
                }

                _context9.next = 7;
                return poemModel.findById({
                  _id: id
                }).exec();

              case 7:
                retrievedPoem = _context9.sent;

                if (!(retrievedPoem.authorID != currentUser.id)) {
                  _context9.next = 10;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("You are not authenticated");

              case 10:
                _context9.next = 12;
                return poemModel.findOneAndUpdate({
                  _id: id
                }, {
                  $set: {
                    title,
                    content,
                    isPrivate,
                    lastUpdated: new Date()
                  }
                }, {
                  upsert: true,
                  returnOriginal: true
                });

              case 12:
                return _context9.abrupt("return", _context9.sent);

              case 13:
                _context9.next = 15;
                return poemModel.create({
                  title,
                  content,
                  isPrivate: !(0, _lodash.isNil)(isPrivate) ? isPrivate : false,
                  authorID: currentUser.id,
                  author: currentUser.username,
                  removed: false,
                  compliments: 0,
                  createdAt: new Date()
                });

              case 15:
                return _context9.abrupt("return", _context9.sent);

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function createPoem(_x25, _x26, _x27) {
        return _createPoem.apply(this, arguments);
      }

      return createPoem;
    }(),
    complimentPoem: function () {
      var _complimentPoem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(_, _ref20, _ref21) {
        var poemID, poemModel;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                poemID = _ref20.poemID;
                poemModel = _ref21.models.poemModel;
                _context10.next = 4;
                return poemModel.findOneAndUpdate({
                  _id: poemID
                }, {
                  $inc: {
                    compliments: 1
                  }
                });

              case 4:
                return _context10.abrupt("return", `Successfully Complimented ${poemID}`);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function complimentPoem(_x28, _x29, _x30) {
        return _complimentPoem.apply(this, arguments);
      }

      return complimentPoem;
    }(),
    removePoemByID: function () {
      var _removePoemByID = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(_, _ref22, _ref23) {
        var poemID, poemModel;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                poemID = _ref22.poemID;
                poemModel = _ref23.models.poemModel;
                _context11.next = 4;
                return poemModel.findOneAndUpdate({
                  _id: poemID
                }, {
                  $set: {
                    removed: true
                  }
                });

              case 4:
                return _context11.abrupt("return", `Successfully Removed ${poemID}`);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function removePoemByID(_x31, _x32, _x33) {
        return _removePoemByID.apply(this, arguments);
      }

      return removePoemByID;
    }()
  }
};
exports.resolvers = resolvers;