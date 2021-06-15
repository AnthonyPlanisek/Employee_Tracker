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
            addEmployee()
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
        
        // console.table([
        //     res
        // ])
        
    })

}

const addEmployee = () => {

inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the employees first name?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the employees last name?',
      },
      {
        name: 'roleID',
        type: 'input',
        message: 'What is the employees role? (use role ID)',
      },
    //   {
    //     name: 'managerID',
    //     type: 'input',
    //     message: 'Who is the employees Manager? (use managers ID/if they dont have one, leave it blank)',
    //   },
    ])
    .then((answer) => {
      
      connection.query(
        'INSERT INTO employee SET ?',
        
        {
          firstName: answer.firstName,
          lastName: answer.lastName,
          roleID: answer.roleID,
        //   managerID: answer.managerID,
        },
        (err) => {
          if (err) throw err;
          console.log('The employee was made successfully');
          
          start()
        }
      );
    });
};

  
connection.connect((err) => {
    if (err) throw err;
    
    start()
  });