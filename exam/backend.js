'use strict'

let express = require('express');
let app = express();
let mysql = require('mysql');

app.use(express.static(__dirname + '/assets'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a',
    database: 'new'
});

connection.connect(function(err) {
    if (err) {
        console.log('Cannot connect to database' + err.toString());
    } else {
        console.log('Connection established');
    };
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/assets/index.html');
});

app.get('/warehouse', function(req, res){
    connection.query('SELECT * FROM warehouse WHERE category = "sweaters"', function(err, rows){
        console.log(res);
        res.send({
            "result": "ok",
            "data": rows
        });
    });
});

app.listen(3000, () => console.log('server is ok'));