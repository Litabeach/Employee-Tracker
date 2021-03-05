const inquirer = require("inquirer");
const employees = require("./employees");


//initial question with selections for user
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
            else if (response.choices == 'View All Employees')
                employees.viewEmployees();
            else if (response.choices == 'View All Employees By Department')
                selectDepartment();
        })

}

//inquirer questions to add an employee
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
                type: 'input',
                name: 'role',
                message: "What is the employees role?",
                choices: ['lead engineer', 'software engineer', 'accountant', 'legal team aid', 'sales lead', 'lawyer', 'salesperson']

            },
        ])
};

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
            if (response.choices == 'sales')
                employees.viewSales()
            // else if (response.choices == 'engineering')
            // employees.viewEngineers()
            // else if (response.choices == 'finance')
            // employees.viewFinance()
            // else if (response.choices == 'legal')
            // employees.viewLegal()
        })
};


promptChoices()

