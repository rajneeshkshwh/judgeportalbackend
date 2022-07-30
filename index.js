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

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

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
            
            if(pin=='12345'){
                res.send({status: 'OK', judge: 'one'})
            }
            else if(pin=='12346'){
                res.send({status: 'OK', judge: 'two'})
            }
            else if(pin=='12347'){
                res.send({status: 'OK', judge: 'three'})
            }
            else if(pin=='12348'){
                res.send({status: 'OK', judge: 'four'})
            }
            else if(pin=='12349'){
                res.send({status: 'OK', judge: 'five'})
            }
            else{
                res.send({status: 'OK', judge: 'six'})
            }
        }
        else(
            res.send('Invalid Code')
        )
    }
})

app.get('/getleaderboard', (Req,res)=>{
    const array = [];
    var responses=[];
    var ids;
    con.query("SELECT *FROM response", function(errr,result,fields){
        if (errr) throw errr;
        responses = result;
        con.query("SELECT *FROM judges", function(err,results,fields){
            if (err) throw err;
            ids = results;
            var i = 0;
            for(i=0;i<responses.length;i++){
                var score = 0;
                var no = 0;
                if(responses[i].one != 0){
                    score += responses[i].one;
                    no++;
                }
                else if(responses[i].two != 0){
                    score += responses[i].two;
                    no++;
                }
                else if(responses[i].three != 0){
                    score += responses[i].three;
                    no++;
                }
                else if(responses[i].four != 0){
                    score += responses[i].four;
                    no++;
                }
                else if(responses[i].five != 0){
                    score += responses[i].five;
                    no++;
                }
                else if(responses[i].five != 0){
                    score += responses[i].five;
                    no++;
                }
                else if(responses[i].six != 0){
                    score += responses[i].six;
                    no++;
                }
                score = (score!=0 ? score/no : score);
                array.push({id: responses[i].id, firstname: ids[i].firstname, lastname: ids[i].lastname, score: score});
            }
            array.sort((a,b) => a.score - b.score);
            array.reverse();
            res.send(array);
        })
    })
})

app.get('/getindividualdata', (req,res) => {
    con.query("SELECT * FROM judges" , function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
})

app.post('/getresponsedata', (req,res) => {
    const judge = req.body.judge;
    const array = [];
    con.query("SELECT * FROM response" , function (err, result, fields) {
        if (err) throw err;

        res.send(result);
      });
})

app.get('/judges/:id', function(req, res) {
    const array = [];
    const rt = req.params.id;
    con.query("SELECT * FROM response", function (err, result, fields) {
        if (err) throw err;
        for(var i = 0;i<result.length; i++){
            if(rt=='one'){
                array.push(result[i].one);
            }
            else if(rt=='two'){
                array.push(result[i].two);
            }
            else if(rt=='three'){
                array.push(result[i].three);
            }
            else if(rt=='four'){
                array.push(result[i].four);
            }
            else if(rt=='five'){
                array.push(result[i].five);
            }
            else if(rt=='six'){
                array.push(result[i].six);
            }
        }
        console.log(array);
        res.send(array);
      }); 
  });

app.post('/updatescore', (req,res) => {
    const id = req.body.id;
    const judge = req.body.judge;
    const score = req.body.score;

    console.log(id,judge,score);
    // con.query('UPDATE `response` SET ? = ? WHERE `id` = ?',[judge, parseInt(score), parseInt(id)] , function (err, result, fields) {
    //     if (err) throw err;
    //     res.send('updated');
    //   });
    con.query('UPDATE response SET '+ judge +' = ? WHERE id = ?',[ parseInt(score) ,parseInt(id)] , function (err, result, fields) {
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