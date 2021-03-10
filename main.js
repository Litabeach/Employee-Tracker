const inquirer = require("inquirer");
const connection = require("./connection");
const cTable = require('console.table');
var figlet = require('figlet');


//figlet
function displayFiglet() {
    return new Promise(resolve => {
        figlet('Employee Database!!!', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            resolve(data)
        });
    })
}

//main function that diplays the figlet before the main menu
async function main() {
    const figlet = await displayFiglet()
    console.log(figlet)
    await promptChoices()
}

// initial question with selections for user
function promptChoices() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: "What would you like to do",
                choices: ['View All Employees', 'View Employees By Department', 'View Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Manager Role', 'Exit']
            }

        ]).then(function (response) {
            //run a unique function depending on the response
            if (response.choices == 'Add Employee')
                addEmployee();
            else if (response.choices == 'View All Employees') {
                viewEmployees();
            }
            else if (response.choices == 'View Employees By Department') {
                selectDepartment();
            }

            else if (response.choices == 'View Employees By Manager') {
                viewByManager();
            }

            else if (response.choices == 'Remove Employee') {
                removeEmployee();
            }

            else if (response.choices == 'Update Employee Role') {
                updateEmployeeRole();
            }

            else if (response.choices == 'Update Manager Role') {
                updateManager();
            }
            else if (response.choices == "Exit") {
                console.log("Now leaving employee tracker...")
                connection.end();
            }
        })
}//end of promptChoices()    


//Create 
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
                    manager: manager
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee inserted!\n");
                }
            );
            promptChoices();
        })
}

//change the prompt to a list that includes current employees pulled from the database when I figure out how, see updaterole and update manager
//Delete
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
            promptChoices();
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
                viewSales()
            }
            else if (response.department == 'engineering') {
                viewEngineers()
            }
            else if (response.department == 'finance') {
                viewFinance()
            }
            else if (response.department == 'legal') {
                viewLegal()
            }
        })
};


//Update
function updateEmployeeRole() {
    // let sql = "SELECT first_name, last_name FROM employee";
    let sql = `SELECT CONCAT (first_name, " " , last_name) AS full_name FROM employee`
    let employeesArray = [];
    connection.query(sql, function (err, res) {
        if (err) throw err;
        // for each statement to list our each employee name
        res.forEach(employee => {
            employeesArray.push(employee.full_name)
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

                    }
                );

            })
    });
} //end of updateEmployeeRole()


function updateManager() {
    // let sql = "SELECT first_name, last_name FROM employee";
    let sql = `SELECT CONCAT (first_name, " " , last_name) AS full_name FROM employee`
    let employeesArray = [];
    connection.query(sql, function (err, res) {
        if (err) throw err;
        // for each statement to list our each employee name
        res.forEach(employee => {
            employeesArray.push(employee.full_name)
        });
        // var employeeList = employees.getEmployees()
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's manager would you like to update?",
                    choices: employeesArray
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
                    }
                );

            })
    }
    )
}




//Read (view) functions:

//view all employees with sql, show results in a table
function viewEmployees() {
    let sql = "SELECT employee.id, first_name, last_name, title, salary, department, manager FROM employees_db.employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

//view full name and title of people in sales dept
function viewSales() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 1";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

//view full name and title of people in sales dept
function viewEngineers() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 2";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

function viewFinance() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 3";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

function viewLegal() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE department_id = 4";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

function viewPeterson() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Sarah Peterson'";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

function viewXiong() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Gao Xiong'";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
    });
}

function viewLamb() {
    let sql = "SELECT first_name, last_name, title FROM role LEFT JOIN employee ON employee.role_id = role.id WHERE manager = 'Joe Lamb'";
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptChoices()
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


main();
