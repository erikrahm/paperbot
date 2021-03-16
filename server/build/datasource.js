"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataSource = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _apolloDatasourceRest = require("apollo-datasource-rest");

var _parsing = require("./utils/parsing");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var authorizePath = function authorizePath(path) {
  var isFirstParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return `${path}${isFirstParam ? "?" : "&"}key=${process.env.GOOGLE_BOOKS_API_KEY}`;
}; // Extending RESTDataSource to form our own executable API class


var DataSource = /*#__PURE__*/function (_RESTDataSource) {
  (0, _inherits2.default)(DataSource, _RESTDataSource);

  var _super = _createSuper(DataSource);

  function DataSource() {
    var _this;

    (0, _classCallCheck2.default)(this, DataSource);
    _this = _super.call(this);
    _this.baseURL = process.env.GOOGLE_BOOKS_API_URL;
    return _this;
  } // You can create as many methods as you'd like here for your various REST requests


  (0, _createClass2.default)(DataSource, [{
    key: "searchBook",
    value: function () {
      var _searchBook = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(searchString) {
        var sanatizedSearch, result, authorResult, bookPartials;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sanatizedSearch = encodeURIComponent(searchString); // The API requests are triggered using `this` as the class instance followed by the
                // HTTP verb you'd like to use, so in this example it's a GET request

                _context.next = 3;
                return this.get(authorizePath(`/volumes?q=${sanatizedSearch}&maxResults=5&printType=books`));

              case 3:
                result = _context.sent;
                _context.next = 6;
                return this.get(authorizePath(`/volumes?q=+inauthor:${sanatizedSearch}&maxResults=5&printType=books`));

              case 6:
                authorResult = _context.sent;
                bookPartials = result.items && result.items.length ? result.items.map(function (item) {
                  return (0, _parsing.parseBookBase)(item);
                }) : null; // Returning the values we need, or null if the value is not required and return empty

                return _context.abrupt("return", bookPartials);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function searchBook(_x) {
        return _searchBook.apply(this, arguments);
      }

      return searchBook;
    }()
  }, {
    key: "getBookByID",
    value: function () {
      var _getBookByID = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
        var result, book;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.get(authorizePath(`/volumes/${id}`, true));

              case 2:
                result = _context2.sent;
                book = (0, _parsing.parseBook)(result); // Returning the values we need, or null if the value is not required and return empty

                return _context2.abrupt("return", book);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBookByID(_x2) {
        return _getBookByID.apply(this, arguments);
      }

      return getBookByID;
    }()
  }]);
  return DataSource;
}(_apolloDatasourceRest.RESTDataSource);

exports.DataSource = DataSource;