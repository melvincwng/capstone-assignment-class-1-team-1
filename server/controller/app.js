var express = require("express");
var movie = require("../model/movie");

var app = express();

// Test route - to check if the server is up and running
app.get("/health", function (req, res) {
  res.status(200).send({ status: "OK" });
});

// A) MOVIE ROUTES
// Get all movies
app.get("/movies", function (req, res) {
  movie.getAllMovies(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send({ message: "An unexpected error has occurred!" });
    }
  });
});


// B) Sort Movies by Ascending A to Z
app.get("/movies/AtoZ", function (req, res) {
  movie.sortMoviesAtoZ(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.status(500).send({ message: "An unexpected error has occurred!" });
    }
  });

  // C) Sort Movies from Z to A
  app.get("/movies/ZtoA", function (req, res) {
    movie.sortMoviesZtoA(function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
        res.status(500).send({ message: "An unexpected error has occurred!" });
      }
    });
  });
});

module.exports = app;
