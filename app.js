const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'Employee_management_system'

});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('DB connected')
    db.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
})
