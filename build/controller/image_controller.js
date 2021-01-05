"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formidable = _interopRequireDefault(require("formidable"));

var _fs = _interopRequireDefault(require("fs"));

var _Image = _interopRequireDefault(require("../model/Image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create_image = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var form;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            form = new _formidable["default"].IncomingForm();
            form.keepExtensions = true;
            form.parse(req, /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, fields, files) {
                var new_image, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return", res.status(400).json({
                          error: "Image could not be uploaded"
                        }));

                      case 2:
                        new_image = new _Image["default"](fields);
                        new_image.posted_by = req.profile;

                        if (files.image) {
                          new_image.image.data = _fs["default"].readFileSync(files.image.path);
                          new_image.image.contentType = files.image.type;
                        }

                        _context.prev = 5;
                        _context.next = 8;
                        return new_image.save();

                      case 8:
                        result = _context.sent;
                        res.json(result);
                        _context.next = 15;
                        break;

                      case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](5);
                        return _context.abrupt("return", res.status(400).json({
                          error: _context.t0
                        }));

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[5, 12]]);
              }));

              return function (_x3, _x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function create_image(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var list_by_user = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var is_author, user_id, images;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            is_author = req.is_author;
            user_id = req.profile._id;
            _context3.prev = 2;

            if (!is_author) {
              _context3.next = 9;
              break;
            }

            _context3.next = 6;
            return _Image["default"].find({
              posted_by: user_id
            }).populate('posted_by', '_id username').sort('-created').exec();

          case 6:
            images = _context3.sent;
            _context3.next = 12;
            break;

          case 9:
            _context3.next = 11;
            return _Image["default"].find({
              posted_by: user_id,
              status: "public"
            }).populate('posted_by', '_id username').sort('-created').exec();

          case 11:
            images = _context3.sent;

          case 12:
            res.json(images);
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", res.status(400).json({
              error: _context3.t0
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 15]]);
  }));

  return function list_by_user(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var delete_image = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var image, deleted_image;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            image = req.image;
            _context4.prev = 1;
            _context4.next = 4;
            return image.deleteOne();

          case 4:
            deleted_image = _context4.sent;
            res.json(deleted_image);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(400).json({
              error: _context4.t0
            }));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function delete_image(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var image_id = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next, id) {
    var image;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _Image["default"].findById(id).populate('posted_by', '_id username').exec();

          case 3:
            image = _context5.sent;

            if (image) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status('400').json({
              error: "Image not found"
            }));

          case 6:
            req.image = image;
            next();
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status('400').json({
              error: "Could not retrieve use post"
            }));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function image_id(_x10, _x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  create_image: create_image,
  delete_image: delete_image,
  list_by_user: list_by_user,
  image_id: image_id
};
exports["default"] = _default;