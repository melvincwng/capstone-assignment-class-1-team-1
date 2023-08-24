// FYI - Do not use 'multipleStatements: true' as a connection option as it exposes you to SQL injection attacks!
// Update 28/05/2023:
// - For password, please refer to the actual password stored in the pm2 server (SSH using PuTTy). This pw below is just for demo purposes (doesn't work)!
// - For security reasons, make sure your DB is NOT publicly accessible (put as PRIVATE aka it's in its own private subnet) & use SECURE DB username & password.
// - Take note only password can be changed in AWS RDS database after creation... username cannot be changed once RDS instance is created (aka is fixed).
// - But if DB is in private subnet, your AWS resources or client (e.g. MySQL Workbench) will not be able it via internet
// - To configure that aka - allow a) trusted AWS EC2 instance and/or b) MySQL Workbench to connect to our DB, we need to do the following:
// -  A) Go to AWS RDS --> Select that DB instance --> Actions --> Click on option 'Set up EC2 connection' --> Select that particular EC2 instance you want to connect --> Press OK --> AWS will automatically generate the neccessary Target Groups for both your EC2 and RDS to allow a connection between them
// -      Additional References: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/ec2-rds-connect.html && https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.Scenarios.html
// -  B) To allow MySQL WB to connect to our DB, we need this architecture example:
// -      MySQL (client) --> SSH into your public EC2 instance --> connect to your AWS RDS DB
// -      Refer to this documentation link to setup the connection: https://repost.aws/knowledge-center/rds-mysql-ssh-workbench-connect-ec2
// -      You might encounter issue whereby MySQL could not connect the SSH tunnel -> access denied for 'none' (when you 'Test Connection').
// -      Reference link to fix issue (use PuttyGen to re-export SSH key): https://stackoverflow.com/questions/65145221/mysql-could-not-connect-the-ssh-tunnel-access-denied-for-none
// Extras: Remember to use 'nano' command in linux terminal to open & edit the file directly in terminal. Then press 'Cltrl + O' to save and 'Cltrl + X' to exit.

var mysql = require("mysql");
var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "localhost",
      // host: "sp-movies-fcp-database.co0bsltnh95y.ap-southeast-1.rds.amazonaws.com", // Resource is already decommisioned - not in use anymore as of 24/08/2023
      user: "root", // Change to your specific MySQL workbench username for it to work locally
      password: "qwerty123", // Change to your specific MYSQL workbench password for it to work locally (NOT ACTUAL PW, just a DEMO PW - see notes above for more info!)
      database: "bdd_assignment",
    });
    return conn;
  },
};
module.exports = dbconnect;
