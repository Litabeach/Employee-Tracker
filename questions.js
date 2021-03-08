const inquirer = require("inquirer");
const employees = require("./employees");
const connection = require("./connection");

// initial question with selections for user
function promptChoices() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: "What would you like to do",
                choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Manager Role']
            },
        ]).then(function (response) {
            //run a unique function depending on the response
            if (response.choices == 'Add Employee')
                addEmployee();
            else if (response.choices == 'View All Employees') {
                employees.viewEmployees();
            }
            else if (response.choices == 'View All Employees By Department') {
                selectDepartment();
            }
            else if (response.choices == 'View All Employees By Manager') {
                viewByManager();
            }
            else if (response.choices == 'Remove Employee') {
                removeEmployee();
            }
        })
}


// inquirer questions to add an employee
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
            console.log("Creating a new employee...\n");
            //insert into SQL
            var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: role
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
              "DELETE FROM employees WHERE ?",
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
    // addEmployee,
    // removeEmployee,
    selectDepartment,
    viewByManager
    // promptChoices
}