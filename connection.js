var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employees_db"
});


module.exports = connection;

  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
