"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pass) {
    var match;
    return _regenerator["default"].wrap(function _callee$(_context) {
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