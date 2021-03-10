//Update
function updateEmployeeRole() {
    let sql = "SELECT first_name FROM employee"
    let sql2 = "SELECT last_name FROM employee"

    // console.log(sql)
    let firstNameArray = [];
    let lastNameArray = [];
    connection.query(sql, function (err, res) {
        if (err) throw err;
        // console.log(res)
        // for each statement to list our each employee name
        res.forEach(employee => {
            firstNameArray.push(employee.first_name)
        });

        res.forEach(employee => {
            lastNameArray.push(employee.last_name)
        });

        return inquirer
            .prompt([
              
                {
                    name: 'selectFirst',
                    type: 'list',
                    message: "What is the first name of the employee would you like to update?",
                    choices: employeesArray,
                },

                {
                    name: 'selectLast',
                    type: 'list',
                    message: "What is the last name of the employee would you like to update?",
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
                    "UPDATE employee INNER JOIN role on employee.role_id = role.id SET ? WHERE ??",
                    
                    //use employee ID for WHERE instead of first/last name? pulled from mySQL statement. console names to user, use ID for where statement.
                    [
                        {
                            title: response.updateRole
                        },
                        {
                            first_name: response.selectFirst
                        },
                        {
                            last_name: response.selectLast
                        },
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee role updated!\n");

                    }
                );

            })
    });
} //end of updateEmployeeRole()


inquirer
.prompt([
  {
    name: 'choice',
    type: 'rawlist',
    choices() {
      const choiceArray = [];
      results.forEach(({ item_name }) => {
        choiceArray.push(item_name);
      });
      return choiceArray;
    },
    message: 'What auction would you like to place a bid in?',
  },
  {
    name: 'bid',
    type: 'input',
    message: 'How much would you like to bid?',
  },
])
.then((answer) => {
  // get the information of the chosen item
  let chosenItem;
  results.forEach((item) => {
    if (item.item_name === answer.choice) {
      chosenItem = item;
    }
  });

  // determine if bid was high enough
  if (chosenItem.highest_bid < parseInt(answer.bid)) {
    // bid was high enough, so update db, let the user know, and start over
    connection.query(
      'UPDATE auctions SET ? WHERE ?',
      [
        {
          highest_bid: answer.bid,
        },
        {
          id: chosenItem.id,
        },
      ],