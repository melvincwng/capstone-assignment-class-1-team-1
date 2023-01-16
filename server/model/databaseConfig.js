var mysql = require("mysql");
var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root", // Change to your specific MySQL workbench username for it to work
      password: "winwin888", // Change to your specific MYSQL workbench password for it to work
      database: "bdd_assignment",
    });
    return conn;
  },
};
module.exports = dbconnect;
