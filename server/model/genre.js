var db = require("./databaseConfig.js");

var genreDB = {
  getGenres: function (callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM genre";
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
  addGenre: function (name, description, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");

        var sql = "INSERT into genre(name, description) values(?,?)";

        conn.query(sql, [name, description], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log("Add genre - result: ", result);
            console.log(result.affectedRows);
            return callback(null, result.affectedRows);
          }
        });
      }
    });
  },
  deleteGenre: function (genreID, callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "DELETE FROM genre WHERE genreID=?";
        conn.query(sql, [genreID], function (err, result) {
          // Close the connection after querying to save connection resources
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log("Delete genre - result: ", result.affectedRows);
            return callback(null, result.affectedRows);
          }
        });
      }
    });
  },
};

module.exports = genreDB;
