const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: 'alrpacomp.mysql.database.azure.com',
//     user: 'comp_admin',
//     password: 'W6AuaBRLZeehwQycLdRE',
//     // database: 'judgeportal',
//     port: "3306"
// });
const con = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'E939GyEwfl',
    password: 'P2gnSj7Fbg',
    database: 'E939GyEwfl',
    port: "3306"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("connected!");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));


app.get('/', (req,res) => {
    res.send('Hello world');
});

app.post('/checkcode', (req,res) => {
    if(req.body.code){
        const pin = req.body.code;
        if(pin=='12345' || pin=='12346' || pin=='12347'){
            res.send('OK')
        }
        else(
            res.send('Invalid Code')
        )
    }
})

app.get('/getindividualdata', (req,res) => {
    con.query("SELECT * FROM judges", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
})

app.post('/getindividualdatabyid', (req,res) => {
    const id = req.body.id;
    var sql = 'SELECT * FROM judges WHERE id = ' + mysql.escape(id);
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on ${port}`);
});