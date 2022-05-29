const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3006;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost@127.0.0.1',
    user: 'root',
    password: 'testpassword',
    database: 'EMS'
  },
  console.log(`Connected to the EMS database.`)
);

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
                      'Update an employee role'],
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
    })
}

function viewDepartments() {
    const table = cTable.getTable([
        {
          name: 'foo',
          age: 10
        }, {
          name: 'bar',
          age: 20
        }
      ]);
      
      console.log(table);
}

app.use((req, res) => {
    res.status(404).end();
  });

app.get('/db', (req,res) => {
    res.json(path.join(__dirname,'./Employee_management_system/db/EMS.session.sql'))
})
  
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });

startMenu()
