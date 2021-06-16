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
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', 'EXIT'],
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
            console.log("addE")
            addEmployee()
            
        } else if (answer.startMenu === 'Remove Employee') {
            console.log("remove")
            removeEmployee()

        } else if (answer.startMenu === 'Add Department') {
            console.log("addD")
            addDepartment()

        } else if (answer.startMenu === 'Add Role') {
            console.log("addR")
            addRole()

        } else {
          connection.end();
        }
      });
}

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
    //   let managerInfo 
    //   if (answer.managerID = '') {
    //       managerInfo = null
    //   } else {
    //       managerInfo = answer.managerID
    //   }
      connection.query(
        'INSERT INTO employee SET ?',
        
        {
          firstName: answer.firstName,
          lastName: answer.lastName,
          roleID: answer.roleID,
        //   managerID: managerInfo,
        },
        (err) => {
          if (err) throw err;
          console.log('The employee was made successfully');
          
          start()
        }
      );
    });
}

const removeEmployee = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
         .prompt([
             {
                 name: "choice",
                 type: "rawlist",
                 choices() {
                     const choiceArray = []
                     results.forEach(({ firstName }) => {
                         choiceArray.push(firstName)
                     })
                     return choiceArray
                 },
                 message: "What employee to remove?"
             }
         ])
         .then((answer) => {
        
                results.forEach((employee) => {
                    if (employee.firstName === answer.choice) {
                        console.log("correct")
                        connection.query(
                        "DELETE FROM employee WHERE ?",
                        [
                            {
                                firstName: answer.choice
                            }
                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('employee deleted successfully');
                            start();
                        }
                        )
                    }
                }) 
            })
    })

}

const addDepartment = () => {
    
inquirer
.prompt([
  {
    name: 'departmentName',
    type: 'input',
    message: 'What is the new department name?',
  },
])
.then((answer) => {

  connection.query(
    'INSERT INTO department SET ?',
    
    {
      name: answer.departmentName
    },
    (err) => {
      if (err) throw err;
      console.log('The department was made successfully');
      
      start()
    }
  );
});
}

const addRole = () => {
    inquirer
.prompt([
  {
    name: 'roleName',
    type: 'input',
    message: 'What is the new role name?',
  },
  {
    name: 'roleSalary',
    type: 'input',
    message: 'What is the new roles salary',
  },
  {
    name: 'roleDepartment',
    type: 'input',
    message: 'What is the new role department (use department ID)',
  },
])
.then((answer) => {

  connection.query(
    'INSERT INTO roles SET ?',
    
    {
      title: answer.roleName,
      salary: answer.roleSalary,
      departmentID: answer.roleDepartment
    },
    (err) => {
      if (err) throw err;
      console.log('The role was made successfully');
      
      start()
    }
  );
});
}

const updateER = () => {
    
}

connection.connect((err) => {
    if (err) throw err;
    start()
  })