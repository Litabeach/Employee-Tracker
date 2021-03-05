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


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function viewEmployees() {
  let sql = "SELECT first_name, last_name FROM employees_db.employee";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}

function viewEmployeesDept() {
  let sql = "SELECT * FROM employees_db.employee";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}

module.exports = {
  viewEmployees,
  viewEmployeesDept }
