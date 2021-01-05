"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _image_controller = _interopRequireDefault(require("../controller/image_controller"));

var _user_controller = _interopRequireDefault(require("../controller/user_controller"));

var router = _express["default"].Router(); // upload a new image


router.route('/image/new/:userId').post(_user_controller["default"].require_signin, _user_controller["default"].is_account, _image_controller["default"].create_image); // get all images of an user

router.route('/image/:userId').get(_user_controller["default"].require_signin, _user_controller["default"].is_author, _image_controller["default"].list_by_user); // delete an image

router.route('/image/:imageId')["delete"](_user_controller["default"].require_signin, _user_controller["default"].has_authorization, _image_controller["default"].delete_image);
router.param('userId', _user_controller["default"].user_id);
router.param('imageId', _image_controller["default"].image_id);
var _default = router;
exports["default"] = _default;