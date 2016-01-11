var express = require('express');
var mongoose =  require('mongoose');
var path = require('path');
var uuid = require('node-uuid');
var vash = require('vash');

var gameTracker = require('./game-tracker');
var game = require('./game');

var app = express();
var http = require('http').Server(app);

//set port from environment
var port = process.env.PORT || 8080;

var io = require('socket.io')(http);

var mongoCS = 'mongodb://tictac_user:tictactoe123@ds039185.mongolab.com:39185/md_tictactoe';

mongoose.connect(mongoCS);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("database connected");
});

//initialize the tracker to watch for connections
gameTracker.init(io);

//set public folder up to serve static files
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'vash');
app.set('views', path.join( __dirname, '/views') );



//Routes
//index : basic game board, do not use template engine here
app.get('/', function(req, res)
{
    res.render('index', null);
});

//using vash to provide dynamic template
app.get('/history', function(req, res)
{
    res.render('history',
        { gameList: [{gameId: "id 1", status: "Player1 Winner"},
                   {gameId: "id 2", status: "Tie Game"},
                   {gameId: "id 3", status: "Player2 Winner"}]
        });
});

app.get('/replay', function(req, res)
{
    console.log(res);
    res.render('replay', null);
});


console.log();
console.log('http://localhost:' + port);
console.log();


http.listen(port);


