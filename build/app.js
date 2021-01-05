"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user_route = _interopRequireDefault(require("./route/user_route"));

var _image_route = _interopRequireDefault(require("./route/image_route"));

require('dotenv').config();

var app = (0, _express["default"])(); // use some library middlewares

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])({
  credentials: true,
  origin: '*'
})); // connect to database

_mongoose["default"].connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose["default"].connection.once("open", function () {
  console.log("Connected to MongoDB");
}); // map all routes to the app


app.use('/api', _user_route["default"]);
app.use('/api', _image_route["default"]); // catch authentication and authorization error

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      "error": err.name + ": " + err.message
    });
  } else if (err) {
    res.status(400).json({
      "error": err.name + ": " + err.message
    });
    console.log(err);
  }
}); // Hello route

app.get('/', function (req, res) {
  res.send("Hello");
});
app.listen(process.env.PORT, function () {
  console.log("App is running on port ".concat(process.env.PORT));
});