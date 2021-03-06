const inquirer = require("inquirer");
const employees = require("./employees");

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
        ])
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
            if (response.manager == 'Sarah Peterson'){
            employees.viewPeterson()
            }
            else if (response.manager == 'Gao Xiong'){
            employees.viewXiong()
            }
            else if (response.manager == 'Joe Lamb'){
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
            if (response.department == 'sales'){
            employees.viewSales()
            }
            else if (response.department == 'engineering'){
            employees.viewEngineers()
            }
            else if (response.department == 'finance'){
            employees.viewFinance()
            }
            else if (response.department == 'legal'){
            employees.viewLegal()
            }
        }) 
};

module.exports = {
    addEmployee,
    selectDepartment,
    viewByManager
}