var db = require("./databaseConfig.js");

var movieDB = {
  getAllMovies: function (callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM movie";
        conn.query(sql, function (err, result) {
          // Close the connection after querying to save connection resources
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },

  getAllMoviesZtoA: function (callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM movie ORDER BY name DESC;";
        conn.query(sql, function (err, result) {
          // Close the connection after querying to save connection resources
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
};

module.exports = movieDB;
