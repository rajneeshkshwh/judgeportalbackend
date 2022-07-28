const mysql = require("mysql");


// var connection = mysql.createPool({
//     host: 'remotemysql.com',
//     user: 'E939GyEwfl',
//     password: 'P2gnSj7Fbg',
//     database: 'E939GyEwfl',
//     port: "3306"
// });
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alphalake'
});


module.exports = connection;