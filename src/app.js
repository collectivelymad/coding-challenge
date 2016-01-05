var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

var mongoCS = 'mongodb://tictac_user:tictactoe123@ds039185.mongolab.com:39185/md_tictactoe';


console.log('Game on!!!');

//set port from environment
var port = process.env.PORT || 8080;

var io = require('socket.io')(http);


//set public folder up to serve static files
app.use(express.static(path.resolve(__dirname, 'public')));


//Routes

//index :
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
    console.log('connected');

    socket.contents = 'test';

    socket.on('event', function (data) {
        console.log('event');
    });


    socket.on('playturn', function (data) {
        console.log('playturn');
    });

    socket.on('disconnect', function () {
        console.log('Disconnected');
    });
});

console.log('http://localhost:' + port);

http.listen(port);


