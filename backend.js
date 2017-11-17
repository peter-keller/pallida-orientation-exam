'use strict';

var express = require('express');
var mysql = require('mysql');
var app = express();

app.use(express.json());

app.use(express.static('/assets/frontend'));
app.use('/assets', express.static('./assets'));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ridata94',
    database: 'licence_plates'
    });

connection.connect(function(err){
    if (err) {
        console.log("Cannot connect to database");
    } else { 
        console.log("Connection estabilished");
}});


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/assets/index.html');
});

app.get('/search?', function(request, response) {
    console.log(request.query.q);
    if (request.query.q) {
        var queryString = `SELECT * FROM licence_plates WHERE plate = '${request.query.q}'`;
    } else {
        var queryString = 'SELECT * FROM licence_plates;'
    };
    connection.query(queryString, function(err, result) {
    response.send(result);
});
});

app.get('/search/:brand', function(request, response) {
    var queryString = 'SELECT * FROM licence_plates;'
    if (request.params.brand) {
        var queryString = `SELECT * FROM licence_plates WHERE car_brand = '${request.params.brand}'`
    } else {
        var queryString = 'SELECT * FROM licence_plates;'
    };
    connection.query(queryString, function(err, result) {
    response.send(result);
    });
});


app.listen(8080,  () => console.log('Running'));