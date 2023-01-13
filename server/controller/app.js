var express = require("express");

var app = express();

app.get("/health", function (req, res) {
  res.status(200).send({ status: "OK" });
});

module.exports = app;
