const inquirer = require("inquirer");



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
            if (response.choices  == 'Add Employee')
            addEmployee();
        })

}

promptChoices()
// if choices == 'Add Employee'
// addEmployee()

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
                choices: ['sales', 'engineering', 'finance', 'legal']

            },
        ])
};
