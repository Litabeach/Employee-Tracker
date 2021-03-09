const main = require("./main");
const connection = require("./connection");
const cTable = require('console.table');
// const firstQuestion = require("./firstQuestion");

// console.log(main.init())
// console.log(main)
// console.log(main.test)


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function getEmployees() {
  let sql = "SELECT first_name, last_name FROM employees_db.employee";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    // for each statement to list our each employee name
    res.forEach(field => {
      console.log(field.first_name, field.last_name)
    });
  });
}
//view all employees with sql, show results in a table
function viewEmployees() {
  let sql = "SELECT employee.id, first_name, last_name, title, salary, department, manager FROM employees_db.employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices()
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

function viewPeterson(){
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Sarah Peterson'";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices();
  });
}

function viewXiong(){
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Gao Xiong'";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    // main.promptChoices();
  });
}

function viewLamb(){
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Joe Lamb'";
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
  viewLegal,
  viewPeterson,
  viewXiong,
  viewLamb,
  getEmployees
}