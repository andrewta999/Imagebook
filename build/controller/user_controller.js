"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _User = _interopRequireDefault(require("../model/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var signin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, match, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findOne({
              "username": req.body.username
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status('401').json({
              error: "User not found"
            }));

          case 6:
            _context.next = 8;
            return user.comparePassword(req.body.password);

          case 8:
            match = _context.sent;

            if (match) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Username and password don't match"
            }));

          case 11:
            //generate a token signed with userID
            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, process.env.JWT_SECRET); //return json

            return _context.abrupt("return", res.json({
              token: token,
              user: {
                _id: user._id,
                username: user.username
              }
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status('401').json({
              error: "Could not signin"
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var signout = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", res.status('200').json({
              message: "Signed out successfully!"
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signout(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var list_all_users = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].find().select('username created');

          case 3:
            users = _context3.sent;
            res.json(users);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(400).json({
              error: _context3.t0
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function list_all_users(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var create_user = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = new _User["default"](req.body);
            _context4.prev = 1;
            _context4.next = 4;
            return user.save();

          case 4:
            return _context4.abrupt("return", res.status(200).json({
              message: "Successfully signed up!"
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(400).json({
              error: _context4.t0
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function create_user(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var user_id = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next, id) {
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _User["default"].findById(id).select("username created");

          case 3:
            user = _context5.sent;

            if (user) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status('400').json({
              error: "User not found"
            }));

          case 6:
            // else pass request to next function
            // populate user object
            req.profile = user;
            next();
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status('400').json({
              error: "Could not retrieve user"
            }));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function user_id(_x9, _x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

var require_signin = (0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  requestProperty: 'auth',
  algorithms: ['HS256']
});

var is_author = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (req.profile && req.auth && req.profile._id == req.auth._id) {
              req.is_author = true;
            } else {
              req.is_author = false;
            }

            next();

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function is_author(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

var has_authorization = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var authorized;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            authorized = req.auth && req.image && req.image.posted_by._id == req.auth._id;

            if (authorized) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", res.status('403').json({
              error: "User is not authorized"
            }));

          case 3:
            next();

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function has_authorization(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

var is_account = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
    var account;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            account = req.auth && req.profile && req.auth._id == req.profile._id;

            if (account) {
              _context8.next = 3;
              break;
            }

            return _context8.abrupt("return", res.status('403').json({
              error: "User can not upload to this account"
            }));

          case 3:
            next();

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function is_account(_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();

var _default = {
  signin: signin,
  signout: signout,
  list_all_users: list_all_users,
  create_user: create_user,
  user_id: user_id,
  require_signin: require_signin,
  is_author: is_author,
  has_authorization: has_authorization,
  is_account: is_account
};
exports["default"] = _default;