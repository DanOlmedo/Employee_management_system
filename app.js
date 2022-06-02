const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'employee_management_system'

});

function dbConnection(){
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('DB connected')
    db.query("SELECT dep_name FROM department", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
})
};

function exitFunction(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Would you like to continue?',
            choices: ['Go back to main menu',
                      'Exit'
                      ]
          },
    ]).then((choice) => {

        if(choice.action ==  'Go back to main menu') {
            startMenu()
        }

        if(choice.action ==  'Exit') {
            console.log('Bye');
        }
    })
};

function startMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments',
                      'View all roles',
                      'View all employees',
                      'Add a department',
                      'Add a role',
                      'Add an employee',
                      'Update an employee role',
                      'Exit'],
          },
    ]).then((choice) => {

        if(choice.action ==  'View all departments') {
            viewDepartments()
        }

        if(choice.action ==  'View all roles') {
            viewRoles()
        }

        if(choice.action ==  'View all employees') {
            viewEmployees()
        }

        if(choice.action ==  'Add a department') {
            addDepartment()
        }

        if(choice.action ==  'Add a role') {
            addRole()
        }

        if(choice.action ==  'Add an employee') {
            addEmployee()
        }

        if(choice.action ==  'Update an employee role') {
            updateEmployee()
        }

        if(choice.action ==  'Exit') {
            console.log('Bye')
        }
    })
}

function viewDepartments() {
    db.connect((err) => {
        if(err){
            throw err;
        }
        console.log('DB connected')
        db.query("SELECT dep_name FROM department", function (err, result) {
            if (err) throw err;
            console.table(result);
            exitFunction()
          });   
    })  
}

function viewRoles() {
    db.connect((err) => {
        if(err){
            throw err;
        }
        console.log('DB connected')
        db.query("SELECT * FROM roles", function (err, result) {
            if (err) throw err;
            console.table(result);
            exitFunction();
          });
    })   
}

function viewEmployees(){
    db.connect((err) => {
        if(err){
            throw err;
        }
        console.log('DB connected')
        db.query("SELECT * FROM employee", function (err, result) {
            if (err) throw err;
            console.table(result);
            exitFunction();
          });
    })  
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'Type new department name',
          }
    ]).then((response) => {
        db.connect((err) => {
            if(err){
                throw err;
            }
            
            db.query("INSERT INTO department SET ?",{
                dep_name: response.newDep,
            }, function (err){
                throw err;
            },
            console.log('Department added')
            
            )
            exitFunction();
        }) 
    })
}

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newTitle',
            message: 'Type new role name',
          },
          {
            type: 'input',
            name: 'newSalary',
            message: 'Type new role salary',
          },
          {
            type: 'input',
            name: 'departmentid',
            message: 'Type new role department ID',
          },
          
    ]).then((response) => {
        db.query(`INSERT INTO roles (department_id, title, salary) VALUES (${response.departmentid},'${response.newTitle}',${response.newSalary})`);
    })
  
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'fname',
            message: 'First name',
          },
          {
            type: 'input',
            name: 'lname',
            message: 'Last name',
          },
          {
            type: 'input',
            name: 'roleid',
            message: 'Role ID',
          },
          {
            type: 'input',
            name: 'managerid',
            message: 'Manager ID (optional)',
          },
          
    ]).then((response) => {
        db.query(`INSERT INTO employee (first_name, Last_name, role_id, manager_id) VALUES ('${response.fname}','${response.lname}',${response.roleid},${response.managerid})`);
    })
  
}

function updateEmployee(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'update',
            message: 'Which field would you like to update?',
            choices: ['First name',
                      'Last name',
                      'Role',
                      'Manager ID']
          },
    ]).then((response) => {

        if(response.update == 'First name') {
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'oldRole',
                    message: 'ID to modify',
                  },
                {
                    type: 'input',
                    name: 'fname',
                    message: 'New first name',
                  },
            ]).then((response) => {
                db.connect((err) => {
                    if(err){
                        throw err;
                    }
            
                    let updateValues = `UPDATE employee
                           SET first_name = ?
                           WHERE id = ?`;
            
                    let newData  = [`${response.fname}`,`${response.oldRole}`]
            
                    db.query(updateValues,newData,(err, results) => {
                        if (err){
                            throw err;
                          }
                          console.log('Rows affected:', results.affectedRows);
                          exitFunction();
                    })
                })
            })
        }
    
        if(response.update == 'Last name') {
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'oldRole',
                    message: 'ID to modify',
                  },
                {
                    type: 'input',
                    name: 'lname',
                    message: 'New last name',
                  },
            ]).then((response) => {
                db.connect((err) => {
                    if(err){
                        throw err;
                    }
            
                    let updateValues = `UPDATE employee
                           SET last_name = ?
                           WHERE id = ?`;
            
                    let newData  = [`${response.lname}`,`${response.oldRole}`]
            
                    db.query(updateValues,newData,(err, results) => {
                        if (err){
                            throw err;
                          }
                          console.log('Rows affected:', results.affectedRows);
                          exitFunction();
                    })
                })
            })
        }

  })
};

startMenu();

 