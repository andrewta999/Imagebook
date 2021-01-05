"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ImageSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  status: {
    type: String,
    required: 'Status is required'
  },
  posted_by: {
    type: _mongoose["default"].Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model('Image', ImageSchema);

exports["default"] = _default;