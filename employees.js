const main = require("./main");
const connection = require("./connection");
// const cTable = require('console.table');

// console.log(promptChoices.promptChoices)
// console.log(main)
// console.log(main.test)


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


//view all employees with sql, show results in a table
function viewEmployees() {
  let sql = "SELECT * FROM employees_db.employee LEFT JOIN role on role.id = employee.id ";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.init();
  });
}

//view full name and title of people in sales dept
function viewSales() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 1";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices();
  });
} 

//view full name and title of people in sales dept
function viewEngineers() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 2";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices();
  });
} 

function viewFinance() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 3";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices();
  });
} 

function viewLegal() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 4";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices();
  });
} 

module.exports = {
  viewEmployees,
  viewSales,
  viewEngineers,
  viewFinance,
  viewLegal
}

