const inquirer = require("inquirer");
const employees = require("./employees");
const connection = require("./connection");


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
            let role = response.role;
            if (role == 'lead engineer') {
                role = 1;
            }
            else if (role == 'software engineer') {
                role = 2;
            }
            else if (role == 'accountant') {
                role = 3;
            }
            else if (role == 'sales lead') {
                role = 4;
            }
            else if (role == 'lawyer') {
                role = 5;
            }
            else if (role == 'salesperson') {
                role = 6;
            }

            let manager = response.empManager
            if (manager == 'none') {
                manager = null;
            }
            console.log("Creating a new employee...\n");
            //insert into SQL
            var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: role,
                    manager_id: manager
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee inserted!\n");
                }
            );
        })
}

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
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee deleted!\n");
              }
            );
          })
        };


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
            //run a unique function depending on the response
            if (response.manager == 'Sarah Peterson') {
                employees.viewPeterson()
            }
            else if (response.manager == 'Gao Xiong') {
                employees.viewXiong()
            }
            else if (response.manager == 'Joe Lamb') {
                employees.viewLamb()
            }
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


module.exports = {
    addEmployee,
    removeEmployee,
    selectDepartment,
    viewByManager
}