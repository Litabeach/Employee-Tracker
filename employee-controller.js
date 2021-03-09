const inquirer = require("inquirer");
const employees = require("./employee-view");
const connection = require("./connection");
// const main = require("./main");



// inquirer questions to add an employee and sql logic to include that employee in the db
function addEmployee() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employees first name?",

            },

            {
                type: 'input',
                name: 'lastName',
                message: "What is the employees last name?",

            },

            {
                type: 'list',
                name: 'role',
                message: "What is the employees role?",
                choices: ['lead engineer', 'software engineer', 'accountant', 'legal team aid', 'sales lead', 'lawyer', 'salesperson']

            },

            {
                type: 'list',
                name: 'empManager',
                message: "Who is the employee's manager?",
                choices: ['Sarah Peterson', 'Gao Xiong', 'Joe Lamb', 'none']

            },

        ]).then(function (response) {

            //change role.response to role id
            var role = response.role;
            for (var i = 1; i < role.length; i++) {
                role = i
            }

            let manager = response.empManager
            if (manager == 'none') {
                manager = null;
            }
            console.log("Creating a new employee...\n");
            //insert into SQL
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: role,
                    manager : manager
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee inserted!\n");
                }
            );
            main.promptChoices();
        })
}

//change the prompt to a list that includes current employees pulled from the database when I figure out how, see updaterole and update manager
function removeEmployee() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'deleteID',
                message: "What is the ID of the employee that you would like to delete?",
            },

        ]).then(function (response) {
            console.log("Deleting employee...\n");
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    id: response.deleteID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee deleted!\n");
                }
            );
            main.promptChoices();
        })
};


//select department
function selectDepartment() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: "Which department would you like to view?",
                choices: ['sales', 'engineering', 'finance', 'legal']

            },
        ]).then(function (response) {
            //run a unique function depending on the response
            if (response.department == 'sales') {
                employees.viewSales()
            }
            else if (response.department == 'engineering') {
                employees.viewEngineers()
            }
            else if (response.department == 'finance') {
                employees.viewFinance()
            }
            else if (response.department == 'legal') {
                employees.viewLegal()
            }
        })
};


function updateEmployeeRole() {
    // let sql = "SELECT first_name, last_name FROM employee";
  let sql = `SELECT CONCAT (first_name, " " , last_name) AS full_name FROM employee`
  let employeesArray = [];
  // console.log("before connection", employeesArray)
  connection.query(sql, function(err, res) {
  // console.log(res)
  // console.log("after connection", employeesArray)
    if (err) throw err;
    // for each statement to list our each employee name
    res.forEach(employee => {
      //   console.log("first employee", employee.full_name)
      employeesArray.push(employee.full_name)
      // console.log("after push", employeesArray)
  });
  // console.log(employeesArray)
  });
    return inquirer
        .prompt([
            {
                name: 'selectEmployee',
                type: 'list', 
                message: "Which employee would you like to update?",
                choices: employeesArray,
            },

            {
                type: 'list',
                name: 'updateRole',
                message: "What is their new role?",
                choices: ['lead engineer', 'software engineer', 'accountant', 'legal team aid', 'sales lead', 'lawyer', 'salesperson']
            },

        ]).then(function (response) {
            console.log("Updating employee role...\n");
            connection.query(
                "UPDATE employee SET ? WHERE ??",
                //use employee ID for WHERE instead of first/last name? pulled from mySQL statement. console names to user, use ID for where statement.
                [
                    {
                        role_id: response.updateRole
                    },
                    // {
                    //     first_name: response.selectEmployee
                    // },
                    // {
                    //     last_name: response.selectEmployee
                    // }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee role updated!\n");
                    //main.init();
                }
            );

        })
    }


    function updateManager() {
        // var employeeList = employees.getEmployees()
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's manager would you like to update?",
                    choices: ['names of all employees from connection.query pulled using a msql statement? Use employees.getEmployees()?']
                },

                {
                    type: 'list',
                    name: 'newManager',
                    message: "Which employee do you want to set as manager?",
                    choices: ['Sarah Peterson', 'Gao Xiong', 'Joe Lamb']
                },
    
            ]).then(function (response) {
                console.log("Updating employee role...\n");
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    //use employee ID for WHERE instead? pulled from mySQL statement. console names to user, use ID for where statement.
                    [
                        {
                            manager: response.newManager
                        },
                        {
                            first_name: response.employee
                        },
                        {
                            last_name: response.employee
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + "'s manager updated!\n");
                        //main.init();
                    }
                );
    
            })
        }

module.exports = {
                addEmployee,
                removeEmployee,
                selectDepartment,
                updateEmployeeRole,
                updateManager
            }