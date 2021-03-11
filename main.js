const inquirer = require("inquirer");
const connection = require("./connection");
const cTable = require('console.table');
var figlet = require('figlet');


//figlet
function displayFiglet() {
    return new Promise(resolve => {
        figlet('Employee Tracker!!!', function (err, data) {
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
                choices: ['View All Employees', 'View Employees By Department', 'View Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Exit']
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

            else if (response.choices == 'Update Employee Manager') {
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
                choices: ['lead engineer', 'software engineer', 'accountant', 'sales lead', 'lawyer', 'legal team aid', 'salesperson']

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
            else if (role == 'legal team aid') {
                role = 5;
            }
            else if (role == 'lawyer') {
                role = 6;
            }
            else if (role == 'salesperson') {
                role = 7;
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


// //Delete
// function removeEmployee() {
//     return inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 name: 'deleteID',
//                 message: "What is the ID of the employee that you would like to delete?",
//             },

//         ]).then(function (response) {
//             console.log("Deleting employee...\n");
//             connection.query(
//                 "DELETE FROM employee WHERE ?",
//                 {
//                     id: response.deleteID
//                 },
//                 function (err, res) {
//                     if (err) throw err;
//                     console.log(res.affectedRows + " employee deleted!\n");
//                 }
//             );
//             promptChoices();
//         })
// };


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

function removeEmployee() {
    let sql = `SELECT CONCAT (first_name, " " , last_name) AS full_name FROM employee`;
    let employeesArray = [];
    connection.query(sql, function (err, res) {
        if (err) throw err;

        // for each statement to list each employee name
        res.forEach(employee => {
            employeesArray.push(employee.full_name);
        });

        return inquirer
            .prompt([
                
                {
                    name: 'selectEmployee',
                    type: 'list',
                    message: "Which employee would you like to update?",
                    choices: employeesArray,
                },

            ]).then(function (response) {
                console.log("Deleting employee...\n");
                //split the full name so we can access first name and last name individually
                const name = response.selectEmployee.split(' ')  
    
                connection.query(
                    "DELETE FROM employee WHERE ? AND ?",
                    [
                        {
                            first_name: name[0]
                        },
                        {
                            last_name: name[1]
                        },
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee deleted!\n");
                        promptChoices();
                    }
                );
            }) 
    }); 
} 

//Update employee role
function updateEmployeeRole() {
    let sql = `SELECT CONCAT (first_name, " " , last_name) AS full_name FROM employee`;
    let employeesArray = [];
    connection.query(sql, function (err, res) {
        if (err) throw err;

        // for each statement to list each employee name
        res.forEach(employee => {
            employeesArray.push(employee.full_name);
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
                    choices: ['lead engineer', 'software engineer', 'accountant', 'sales lead', 'lawyer', 'legal team aid', 'salesperson']
                },

            ]).then(function (response) {
                console.log("Updating employee role...\n");
                //split the full name so we can access first name and last name individually
                const name = response.selectEmployee.split(' ')  
    
                connection.query(
                    "UPDATE employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id SET ? WHERE ? AND ?",
                    
                    
                    [
                        {
                            title: response.updateRole
                        },
                        {
                            first_name: name[0]
                        },
                        {
                            last_name: name[1]
                        },
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee role(s) updated!\n");
                        promptChoices();
                    }
                );
            }) 
    }); 
} 

//Function to update the employee's manager 
function updateManager() {
    let sql = `SELECT CONCAT (first_name, " " , last_name) AS full_name FROM employee`;
    let employeesArray = [];
    connection.query(sql, function (err, res) {
        if (err) throw err;

        // for each statement to list each employee name
        res.forEach(employee => {
            employeesArray.push(employee.full_name);
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
                    choices: ['Sarah Peterson', 'Gao Xiong', 'Joe Lamb', 'none']
                },

            ]).then(function (response) {
                console.log("Updating employee manager...\n");
                let manager = response.newManager
                if (manager == 'none') {
                    manager = null;
                }
                const name = response.employee.split(' ')  
                connection.query(
                    "UPDATE employee SET ? WHERE ? AND ?",
                    [
                        {
                            manager: response.newManager
                        },
                        {
                            first_name: name[0]
                        },
                        {
                            last_name: name[1]
                        }
                        
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " manager updated!\n");
                        promptChoices();
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