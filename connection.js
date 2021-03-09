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


// var mysql = require("mysql");
// require('dotenv').config();

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: process.env.DB_USER,

//   // Your password
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });


// module.exports = connection;

