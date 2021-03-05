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
        ])
    };


