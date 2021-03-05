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


// SELECT name, quote, network FROM tvcharacter INNER JOIN tvshow ON tvcharacter.showid = tvshow.showid

// SELECT name, title from tvshow LEFT JOIN tvcharacter ON tvcharacter.showid = tvshow.showid WHERE genre = "Drama";

//view all employees with sql, show results in a table
function viewEmployees() {
  let sql = "SELECT * FROM employees_db.employee LEFT JOIN role on role.id = employee.id ";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewSales() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 1";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

module.exports = {
  viewEmployees,
  viewSales
}

