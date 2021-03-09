const inquirer = require("inquirer");
const employeeView = require("./employee-view");
const employeeController = require("./employee-controller");
// var figlet = require('figlet');

//add an async/await to make figlet appear below choices?
// function initFiglet(){
// figlet('Employee Tracker', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });
// }


// initial question with selections for user
async function promptChoices() {
    const response = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: "What would you like to do",
                choices: ['View All Employees', 'View Employees By Department', 'View Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Manager Role', 'Exit']
            }
            
        ])
            //run a unique function depending on the response
            if (response.choices == 'Add Employee')
               employeeController.addEmployee();
            else if (response.choices == 'View All Employees'){
                employeeView.viewEmployees();
            }
            else if (response.choices == 'View Employees By Department'){
                employeeController.selectDepartment();
            }

            else if (response.choices == 'View Employees By Manager'){
                employeeView.viewByManager();
            }

            else if (response.choices == 'Remove Employee') {
                employeeController.removeEmployee();
            }

            else if (response.choices == 'Update Employee Role') {
                employeeController.updateEmployeeRole();
            }

            else if (response.choices ==  'Update Manager Role') {
                employeeController.updateManager();
            }
            else if (response.choices == "Exit") {
            console.log("Now leaving employee database...")
            connection.end();
            }
        }
        
    

// promptChoices();


  while (true){
    promptChoices()
};