"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    trim: true,
    unique: 'Username already exists',
    required: 'Username is required'
  },
  password: {
    type: String,
    required: "Password is required"
  },
  created: {
    type: Date,
    "default": Date.now
  }
});
UserSchema.pre('save', function (next) {
  var user = this; // generate a password hash when the password changes (or a new password)

  if (!user.isModified('password')) return next(); // generate a salt

  _bcrypt["default"].genSalt(10, function (err, salt) {
    if (err) return next(err); // combines the salt and the password to generate a new hash

    _bcrypt["default"].hash(user.password, salt, function (err, hash) {
      if (err) return next(err); // overwriting plaintext password with hash

      user.password = hash;
      next();
    });
  });
}); // compare passwords method

UserSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pass) {
    var match;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].compare(pass, this.password);

          case 2:
            match = _context.sent;
            return _context.abrupt("return", match);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = _mongoose["default"].model("User", UserSchema);

exports["default"] = _default;