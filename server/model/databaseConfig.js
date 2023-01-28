// FYI - Do not use 'multipleStatements: true' as a connection option as it exposes you to SQL injection attacks!
var mysql = require("mysql");
var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      // host: "bdd-assignment-database.cvuchylguroa.us-east-1.rds.amazonaws.com",
      host: "localhost",
      user: "root", // Change to your specific MySQL workbench username for it to work
      password: "qwerty123", // Change to your specific MYSQL workbench password for it to work
      database: "bdd_assignment",
    });
    return conn;
  },
};
module.exports = dbconnect;
