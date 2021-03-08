const inquirer = require("inquirer");
const employees = require("./employees");
const questions = require("./questions");

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
               questions.addEmployee();
            else if (response.choices == 'View All Employees'){
                employees.viewEmployees();
            }
            else if (response.choices == 'View All Employees By Department'){
                questions.selectDepartment();
            }

            else if (response.choices == 'View All Employees By Manager'){
                questions.viewByManager();
            }

            else if (response.choices == 'Remove Employee') {
                questions.removeEmployee();
            }

            else if (response.choices == 'Update Employee Role') {
                questions.updateEmployeeRole();
            }

            // else if (response.choices ==  'Update Manager Role') {
            //     questions.updateManagerRole();
            // }

        })
}


module.exports = {
    promptChoices
}