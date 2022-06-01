const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'Employee_management_system'

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

startMenu();