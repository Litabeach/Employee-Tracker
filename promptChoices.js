const inquirer = require("inquirer");
const employees = require("./employees");

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
            if (response.choices == 'Add Employee'){
                addEmployee();
            }
            else if (response.choices == 'View All Employees'){
                employees.viewEmployees();
            }
            else if (response.choices == 'View All Employees By Department'){
                console.log("select dept")
                selectDepartment();
            }
        })

}


module.exports = {
    promptChoices
}