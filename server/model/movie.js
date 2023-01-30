var db = require("./databaseConfig.js");

var movieDB = {
  getActiveMovies: function (queryStringActiveValue, callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM movie WHERE active = ?";
        conn.query(sql, [queryStringActiveValue], function (err, result) {
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
  getInactiveMovies: function (queryStringInactiveValue, callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM movie WHERE active = ?";
        conn.query(sql, [queryStringInactiveValue], function (err, result) {
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
  getMoviesByNameSubstring: function (movieNameSubstring, callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT * FROM movie WHERE name LIKE ? ORDER BY releaseDate ASC";
        // Add % to the beginning and end of the string to search for substrings (Reference: https://www.w3schools.com/sql/sql_like.asp)
        movieNameSubstring = `%${movieNameSubstring}%`;
        conn.query(sql, [movieNameSubstring], function (err, result) {
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
  getMoviesByGenreID: function (movieGenreID, callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT * FROM movie WHERE genreID = ? ORDER BY releaseDate ASC";
        conn.query(sql, [movieGenreID], function (err, result) {
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
  getMoviesByNameSubstringAndGenreID: function (
    movieNameSubstring,
    movieGenreID,
    callback
  ) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql =
          "SELECT * FROM movie WHERE name LIKE ? AND genreID = ? ORDER BY releaseDate ASC";
        // Add % to the beginning and end of the string to search for substrings (Reference: https://www.w3schools.com/sql/sql_like.asp)
        movieNameSubstring = `%${movieNameSubstring}%`;
        conn.query(
          sql,
          [movieNameSubstring, movieGenreID],
          function (err, result) {
            // Close the connection after querying to save connection resources
            conn.end();
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              return callback(null, result);
            }
          }
        );
      }
    });
  },
  sortMoviesAtoZ: function (callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Sorted A to Z!");
        var sql = "SELECT * FROM movie ORDER BY name ASC"; //Search movie by name to sort Ascending by A to Z
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
  sortMoviesZtoA: function (callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM movie ORDER BY name DESC";
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
  addMovie: function (
    name,
    description,
    releaseDate,
    imageURL,
    genreID,
    active,
    callback
  ) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");

        var sql =
          "INSERT into movie(name, description, releaseDate, imageURL, genreID, active) values(?,?,?,?,?,?)";

        conn.query(
          sql,
          [name, description, releaseDate, imageURL, genreID, active],
          function (err, result) {
            conn.end();
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              console.log("Add movie - result: ", result);
              console.log(result.affectedRows);
              return callback(null, result.affectedRows);
            }
          }
        );
      }
    });
  },
  updateMovie: function (
    name,
    description,
    releaseDate,
    imageURL,
    genreID,
    active,
    movieID,
    updatedByWho,
    callback
  ) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");

        let originalMovieDetails;
        var getOriginalMovieSQL = "SELECT * FROM movie WHERE movieID = ?";
        var updateSQL =
          "UPDATE movie SET name=?, description=?, releaseDate=?, imageURL=?, genreID=?, active=? where movieID=?";
        var logsSQL =
          "INSERT into logs (originalMovieDetails, updatedByWho) values(?,?)";

        // IMPT: Take note even though multipleStatements:true (aka multiple SQL statements) approach can be used here theoretically (i.e. combine all SQL statements above & separate them by ';' - e.g. 'SQL_STATEMENT_1;SQL_STATEMENT_2;SQL_STATEMENT_3')
        // It is NOT USED here because it exposes the database to SQL injection attacks
        // Hence, we are doing nested queries instead (remember to remove extra conn.end() & extra callback() statements or else will face DB issues/errors)
        // The order of the nested queries is important here (i.e. getOriginalMovieDetails -> updateMovieDetails -> if ok, then addLogs)
        conn.query(getOriginalMovieSQL, [movieID], function (err, result) {
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            // 'result' is an array of movie objects.
            // Hence, we do result[0] get the first element of the array to get the original movie object from DB
            // If result is empty [], then result[0] will be undefined (means no movie with this movieID exists in DB)
            if (result[0] === undefined) {
              console.log(
                "Unable to get movie details from DB! Perhaps this movie doesn't exist!"
              );
              return callback(err, null);
            }

            originalMovieDetails = JSON.stringify({
              name: result[0].name,
              description: result[0].description,
              releaseDate: result[0].releaseDate,
              imageURL: result[0].imageURL,
              genreID: result[0].genreID,
              active: result[0].active,
              movieID: result[0].movieID,
            });

            console.log(
              "Getting original movie details - result: ",
              originalMovieDetails
            );

            conn.query(
              updateSQL,
              [
                name,
                description,
                releaseDate,
                imageURL,
                genreID,
                active,
                movieID,
              ],
              function (err, result) {
                if (err) {
                  console.log(err);
                  return callback(err, null);
                } else {
                  console.log("Update movie - result: ", result.affectedRows);

                  // Only insert into logs table if movie details were updated successfully
                  conn.query(
                    logsSQL,
                    [originalMovieDetails, updatedByWho],
                    function (err, result) {
                      conn.end();
                      if (err) {
                        console.log(err);
                        console.log("Failed to insert logs");
                        return callback(err, null);
                      } else {
                        console.log(
                          "Inserting movie logs - result: ",
                          result.affectedRows
                        );

                        if (result.affectedRows == 1) {
                          console.log("Successfully inserted 1 movie log!");
                        }

                        return callback(null, result.affectedRows);
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  },
  deleteMovie: function (movieID, callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "DELETE FROM movie WHERE movieID=?";
        conn.query(sql, [movieID], function (err, result) {
          // Close the connection after querying to save connection resources
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log("Delete movie - result: ", result.affectedRows);
            return callback(null, result.affectedRows);
          }
        });
      }
    });
  },
};

module.exports = movieDB;
