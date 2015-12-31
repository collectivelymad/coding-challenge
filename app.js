//storing values in mongodb
var mongodb = require("mongoose");
var app = require('express')();
var http = require('http').Server(app);

console.log("starting");

//set port from environment
var port = process.env.PORT || 5000;

var io = require('socket.io')(http);

console.log(port);

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/history', function(req, res)
{
    res.sendFile(__dirname + '/views/history.html');
});

app.get('/repplay', function(req, res)
{
    res.sendFile(__dirname + '/views/replay.html');
});


io.on('connection', function (socket) {
    console.log("connected");

    socket.contents = "test";

    socket.on('event', function (data) {
        console.log("event");
    });
    socket.on('disconnect', function () {
        console.log("Disconnected");
    });
});

http.listen(port);


