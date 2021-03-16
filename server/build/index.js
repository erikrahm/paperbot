"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServerExpress = require("apollo-server-express");

var _datasource = require("./datasource");

var _graphqlSchema = require("./graphql-schema");

var _resolvers = require("./resolvers");

var _models = require("./models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Graph our environment variables from our .env file and create a variable for our JWT secret
_dotenv.default.config();

var PORT = process.env.GRAPHQL_PORT || 4000;
var DB_URI = `mongodb+srv://mongod:${encodeURIComponent(process.env.MONGO_DB_PASSWORD)}@cluster0.kmlvn.mongodb.net/paperbot?retryWrites=true&w=majority`;
var SECRET = process.env.JWT_SECRET; // Create express app

var app = (0, _express.default)(); // Custom middleware to add a user object to the server requests

var injectUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req) {
    var token, user;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.authorization;

            if (!token) {
              _context.next = 12;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return _jsonwebtoken.default.verify(token, SECRET);

          case 5:
            user = _context.sent;
            if (typeof user === "object") req.user = _objectSpread({}, user);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.error("FUKED", _context.t0);

          case 12:
            req.next();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function injectUser(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Add Middleware to our Express server


app.use((0, _cors.default)());
app.use(injectUser); // Create a new apollo server instance and provide our Datasource to be accessed in our resolvers

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: (0, _apolloServerExpress.gql)`
    ${_graphqlSchema.typeDefs}
  `,
  resolvers: _resolvers.resolvers,
  dataSources: function dataSources() {
    return {
      externalAPI: new _datasource.DataSource()
    };
  },
  context: function () {
    var _context2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref2) {
      var req;
      return _regenerator.default.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = _ref2.req;

              if (!req) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", {
                models: _models.Models,
                secret: SECRET,
                currentUser: req.user
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }));

    function context(_x2) {
      return _context2.apply(this, arguments);
    }

    return context;
  }(),
  playground: true
}); // Applying middleware to the newly created Apollo Server and
// specify a queriable path (also where GraphQL Playground will display in browser)

server.applyMiddleware({
  app,
  path: "/graphql"
}); // Open up a port and start the express server on it

app.listen({
  port: PORT
}, /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  return _regenerator.default.wrap(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _mongoose.default.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });

        case 2:
          console.log(`Server live at localhost:${PORT}/graphql`);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee3);
})));