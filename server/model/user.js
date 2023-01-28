var db = require("./databaseConfig.js");
var config = require("../config/config.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const saltRounds = 10;

var userDB = {
  getUser: function (userID, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        // The '?' symbol prevents SQL injection (escapes certain characters to prevent SQL injection - see notes)
        // The '?' symbol is replaced with the value of the userID variable & also escapes certain characters to prevent SQL injection (some sanitization is done behind the scenes)
        var sql = "SELECT * FROM user WHERE userID = ?";
        conn.query(sql, [userID], function (err, result) {
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
  getUsers: function (callback) {
    var conn = db.getConnection();
    //implement the database query and return result if successful
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM user";
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
  addUser: function (name, email, role, password, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");

        var sql = "Insert into user(name,email,role,password) values(?,?,?,?)";

        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            console.log(err);
            return callback(err, null);
          }

          password = hash;

          conn.query(
            sql,
            [name, email, role, password],
            function (err, result) {
              conn.end();
              if (err) {
                console.log(err);
                return callback(err, null);
              } else {
                console.log("Add user - result: ", result);
                console.log(result.affectedRows);
                return callback(null, result.affectedRows);
              }
            }
          );
        });
      }
    });
  },
  updateUser: function (email, password, userID, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");

        var sql = "UPDATE user SET email=?,password=? WHERE userID=?";
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            console.log(err);
            return callback(err, null);
          }

          password = hash;

          conn.query(sql, [email, password, userID], function (err, result) {
            conn.end();
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              console.log(result.affectedRows);
              return callback(null, result.affectedRows);
            }
          });
        });
      }
    });
  },
  deleteUser: function (userID, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");

        // Can also delete multiple users at once --> can modify the sql statement to something like "DELETE FROM user WHERE userID IN (value1, value2, ...)"
        // Reference: https://stackoverflow.com/questions/16029441/how-to-delete-multiple-rows-in-sql-where-id-x-to-y
        var sql = "Delete from user where userID=?";

        conn.query(sql, [userID], function (err, result) {
          conn.end();

          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result.affectedRows);
          }
        });
      }
    });
  },
  loginUser: function (email, password, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "select * from user where email=?";

        conn.query(sql, [email], function (err, result) {
          // Close the connection after querying to save connection resources
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            // If a user is found (A user that is registered with that email is found in the DB), we will get 'result', which is an array containing the user object. Hence result.length will return 1.
            // Else if a user cannot be found (i.e. did not match a user from DB), 'result' will be an empty array, hence result.length will return 0.
            // Once that user is found, we check if the password is entered correctly with bcrypt.compare()
            console.log(
              "Did we find a user from DB with the same email address - 0 (False) or 1 (True):",
              result.length
            );
            var token = "";
            if (result.length == 1) {
              // Found the user from the database (due to valid email)
              const foundUser = result[0];
              console.log("What is the foundUser: ", foundUser);
              const passwordEnteredByUser = password;
              const hashedPasswordFromDB = foundUser.password;
              bcrypt.compare(
                passwordEnteredByUser,
                hashedPasswordFromDB,
                function (err, result) {
                  if (err) {
                    console.log(err);
                    return callback(err, null);
                  }

                  console.log(
                    "Result of bcrypt.compare - Does passwordEnteredByUser match hashedPasswordFromDB: ",
                    result
                  );

                  if (result) {
                    // Password is correct
                    // Generate a token and send it back to the user
                    token = jwt.sign(
                      {
                        userID: foundUser.userID,
                        email: foundUser.email,
                        name: foundUser.name,
                        role: foundUser.role,
                        loggedIn: true,
                      },
                      config.secret,
                      {
                        expiresIn: 86400, //expires in 24 hrs
                      }
                    );
                    token = "Bearer " + token; // Add 'Bearer ' in front of the token
                    return callback(null, token);
                  } else {
                    // Password is incorrect
                    // But we mask the error message to state that the email and/or password is invalid to prevent hackers from knowing which field specifically is invalid
                    var err = {
                      message:
                        "User not found - either invalid email and/or password 2.0",
                    };
                    return callback(err, null);
                  }
                }
              );
            } else {
              // Did not find the user from the database (due to invalid email)
              // But we mask the error message to state that the email and/or password is invalid to prevent hackers from knowing which field specifically is invalid
              var err = {
                message:
                  "User not found - either invalid email and/or password 1.0",
              };
              return callback(err, null);
            }
          }
        });
      }
    });
  },
};

module.exports = userDB;
