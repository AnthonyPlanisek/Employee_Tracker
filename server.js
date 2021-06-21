const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: 'password',
    database: 'employeetracker',
  });


const start = () => {

    figlet('Hello World!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    setTimeout(  () => {

    

    
    inquirer
      .prompt({
        name: 'startMenu',
        type: 'list',
        message: 'What would like to do? (use arrow keys)',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', 'Update Employee', 'EXIT'],
      })
      .then((answer) => {
        
        if (answer.startMenu === 'View All Employees') {
            console.log("view All")
            viewAll()
        } else if (answer.startMenu === 'View All Departments') {
            console.log("view D")
            viewDepartments()
        } else if (answer.startMenu === 'View All Roles') {
            console.log("view M")
            viewRoles()
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

        } else if (answer.startMenu === 'Update Employee') {
            console.log("update")
            updateER()

        } else {
          connection.end();
        }
      });
    }, 100) 
}

const viewAll = () => {

    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        // console.log(res)
        
        console.table(res)
            
            setTimeout(  () => {
                start()
            }, 100) 
        
    })

}

const addEmployee = () => { //required - DONE

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

const removeEmployee = () => { //DONE
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
         .prompt([
             {
                 name: "choice",
                 type: "rawlist",
                 choices() {
                     const choiceArray = []
                     results.forEach(({ firstName, lastName, employeeID, roleID, managerID }) => {
                         choiceArray.push(employeeID +" "+ firstName +" "+ lastName +" "+ roleID +" "+ managerID)
                     })
                     return choiceArray
                 },
                 message: "What employee to remove?"
             }
         ])
         .then((answer) => {

            let array = answer.choice.split(" ")
            console.log(array[0])
                results.forEach(( {employeeID} ) => {
                    console.log(employeeID, array[0])
                    if (employeeID == array[0]) {
                        console.log("correct")
                        connection.query(
                        "DELETE FROM employee WHERE ?",
                        [
                            {
                                employeeID: array[0]
                            }
                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('employee deleted successfully');
                            
                        }
                        )
                    }
                }) 
            })
    })

}

const addDepartment = () => { //required - DONE
    
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

const viewDepartments = () => { //required - DONE

    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        // console.log(res)
        
        console.table(res)
            
        
        
    })
}

const viewRoles = () => { //required - DONE

    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        // console.log(res)
        
        console.table(res)
            
        
        
    })
}

const addRole = () => { //required - DONE
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

const updateER = () => { //needs to be fixed - not required
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
         .prompt([
             {
                 name: "choice",
                 type: "rawlist",
                 choices() {
                     const choiceArray = []
                     results.forEach(({ firstName, lastName, employeeID, roleID, managerID }) => {
                         choiceArray.push(employeeID +" "+ firstName +" "+ lastName +" "+ roleID +" "+ managerID)
                     })
                     return choiceArray
                 },
                 message: "What employee to update?"
             },
             {
             name: "role",
             type: "input",
             message: "What role to add?"
            }
         ])
         .then((answer) => {

            let array = answer.choice.split(" ")
            console.log(array[0])
                results.forEach(( {employeeID} ) => {
                    console.log(employeeID, array[0])
                    if (employeeID == array[0]) {
                        console.log("correct")
                        connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                roleID: answer.role,
                            },
                            {
                                employeeID: array[0]
                            },
                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('employee updated successfully');
                            
                        }
                        )
                    }
                }) 
            })
    })
}

//HW done - BONUs - delete R,E,D - view employees by manager - update manager - view budget

connection.connect((err) => {
    if (err) throw err;

    start()
    
  })