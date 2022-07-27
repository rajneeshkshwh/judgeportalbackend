const mysql = require("mysql");


var connection = mysql.createPool({
    host: 'remotemysql.com',
    user: 'E939GyEwfl',
    password: 'P2gnSj7Fbg',
    database: 'E939GyEwfl',
    port: "3306"
});


module.exports = connection;