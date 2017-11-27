'use strict'

let express = require('express');
let app = express();
let mysql = require('mysql');

app.use(express.static(__dirname + '/assets'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a',
  database: 'correct'
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

app.get('/warehouse', function(req, res) {
  connection.query('SELECT * FROM warehouse', function(err, rows){
		if (err) {
			console.log(err.toString());
		};
		res.send({
      "result": "ok",
      "clothes": rows
    });
  });
});

app.get('/price-check', function(req, res) {
	let sql = 'SELECT * FROM warehouse WHERE item_name LIKE ? AND size LIKE ? AND in_store LIKE ?';
	connection.query(sql, req.query.item, req.query.size, req.query.quantity, function(err, result) {
		if (err) {
			console.log(err.toString());
		};
		res.json(result);
	});
});

app.listen(3000, () => console.log('server is ok'));