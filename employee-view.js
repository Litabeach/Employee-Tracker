const connection = require("./connection");
const cTable = require('console.table');

//view all employees with sql, show results in a table
function viewEmployees() {
  let sql = "SELECT employee.id, first_name, last_name, title, salary, department, manager FROM employees_db.employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
    
  });
}

//view full name and title of people in sales dept
function viewSales() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 1";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
} 

//view full name and title of people in sales dept
function viewEngineers() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 2";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
} 

function viewFinance() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 3";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
} 

function viewLegal() {
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 4";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
} 

function viewPeterson(){
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Sarah Peterson'";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewXiong(){
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Gao Xiong'";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewLamb(){
  let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Joe Lamb'";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewByManager() {
  return inquirer
      .prompt([
          {
              type: 'list',
              name: 'manager',
              message: "Select a manager",
              choices: ['Sarah Peterson', 'Gao Xiong', 'Joe Lamb']
          },
      ]).then(function (response) {
          //run a unique view function using SQL depending on the response
          if (response.manager == 'Sarah Peterson') {
             viewPeterson()
          }
          else if (response.manager == 'Gao Xiong') {
              viewXiong()
          }
          else if (response.manager == 'Joe Lamb') {
              viewLamb()
          }
      })
};

module.exports = {
  viewEmployees,
  viewSales,
  viewEngineers,
  viewFinance,
  viewLegal,
  viewPeterson,
  viewXiong,
  viewLamb,
  viewByManager
}