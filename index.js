const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('./connection');
const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: 'remotemysql.com',
//     user: 'E939GyEwfl',
//     password: 'P2gnSj7Fbg',
//     database: 'E939GyEwfl',
//     port: "3306"
// });

// connection();

// function connection() {
//     con.connect(function(err) {
//         if(err){
//             console.log("before reconnecting");
//             connection();
//             console.log("after reconnecting");
//             throw err;
//         } 
//         console.log("connected!");
//     })
// }

// setTimeout(function () { 
//     con.connect(function(err) {
//         if(err) throw err;
//         console.log("connected!");
//     })
//  }, 5000);



app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

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
        if(pin=='12345' || pin=='12346' || pin=='12347' || pin=='12348' || pin=='12349' || pin=='12340'){
            res.send('OK')
        }
        else(
            res.send('Invalid Code')
        )
    }
})

app.get('/getindividualdata', (req,res) => {
    con.query("SELECT * FROM judges" , function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
})

app.post('/updatescore', (req,res) => {
    const id = req.body.id;
    const judge = req.body.judge;
    const score = req.body.score;
    con.query('UPDATE `response` SET `?` = ? WHERE `response`.`id` = ?',[parseInt(judge), parseInt(score), parseInt(id)] , function (err, result, fields) {
        if (err) throw err;
        res.send('updated');
      });
})

app.post('/getindividualdatabyid', (req,res) => {
    const id = req.body.id;
    var sql = 'SELECT * FROM judges WHERE id = ' + mysql.escape(id);
    con.query({sql, timeout:40000}, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on ${port}`);
});