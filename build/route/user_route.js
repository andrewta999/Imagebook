"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user_controller = _interopRequireDefault(require("../controller/user_controller"));

var router = _express["default"].Router(); // signin route


router.route('/signin').post(_user_controller["default"].signin); // signout user

router.route('/signout').get(_user_controller["default"].signout); // get a list of all user or create a new user

router.route('/user').get(_user_controller["default"].list_all_users).post(_user_controller["default"].create_user);
var _default = router;
exports["default"] = _default;