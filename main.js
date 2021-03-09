const inquirer = require("inquirer");
const employees = require("./employees");
const questions = require("./questions");
var figlet = require('figlet');
const connection = require("./connection");

// const firstQuestion = require("./firstQuestion");
// employees.getEmployees();

function initFiglet(){
figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
}

//add an async/await to make figlet appear below choices?

function init(){
    promptChoices();
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
            },
        ]).then(function (response) {
            //run a unique function depending on the response
            if (response.choices == 'Add Employee')
               questions.addEmployee();
            else if (response.choices == 'View All Employees'){
                employees.viewEmployees();
            }
            else if (response.choices == 'View Employees By Department'){
                questions.selectDepartment();
            }

            else if (response.choices == 'View Employees By Manager'){
                questions.viewByManager();
            }

            else if (response.choices == 'Remove Employee') {
                questions.removeEmployee();
            }

            else if (response.choices == 'Update Employee Role') {
                questions.updateEmployeeRole();
            }

            else if (response.choices ==  'Update Manager Role') {
                questions.updateManager();
            }
            else if (response.choices == "Exit") {
            console.log("Now leaving employee database...")
            connection.end();
            }
        })
}

// initFiglet();
init();


module.exports = {
    init,
    promptChoices
}


