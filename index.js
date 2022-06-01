const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost@127.0.0.1',
    user: 'Dan',
    password: 'soitgoes',
    database: 'EMS'
  },
  console.log(`Connected to the EMS database.`)
);


app.get('/db', (req,res) => {
  res.json(path.join(__dirname,'./db/EMS.session.sql'))
  // res.sendFile(path.join(__dirname,'./db/EMS.session.sql'))
})

app.get('/dbtest', (req,res) => {
      db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM departments", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
})

app.get('/test',(req,res) => {
  res.json('./package.json')
  res.sendFile(path.join(__dirname,'./package.json'))
})

app.get('/test2',(req,res) => {
  res.sendFile(path.join(__dirname,'./package.json'))
})

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

// startMenu()
