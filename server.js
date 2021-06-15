const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: 'password',
    database: 'employeetracker',
  });

  const start = () => {
    inquirer
      .prompt({
        name: 'startMenu',
        type: 'list',
        message: 'What would like to do? (use arrow keys)',
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'EXIT'],
      })
      .then((answer) => {
        
        if (answer.startMenu === 'View All Employees') {
            console.log("view All")
            viewAll()
        } else if (answer.startMenu === 'View All Employees By Department') {
            console.log("view D")

        } else if (answer.startMenu === 'View All Employees By Manager') {
            console.log("view M")

        } else if (answer.startMenu === 'Add Employee') {
            console.log("add")

        } else if (answer.startMenu === 'Remove Employee') {
            console.log("remove")

        } else {
          connection.end();
        }
      });
  };

const viewAll = () => {

    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.log(res)
        
        console.table([
            res
        ])
        
    })

}







  // connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start()
  });