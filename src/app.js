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
    var gameSchema = mongoose.Schema({
        gameId: String,
        moves: [],
        finalBoard: [],
        winner: String,
        player1: String,
        player2: String
    });

    var completedGame = mongoose.model('game', gameSchema);


});



//set public folder up to serve static files
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'vash');
app.set('views', path.join( __dirname, '/views') );



//Routes
//index : basic game board, do not use template engine here
app.get('/', function(req, res)
{
    res.render('index', null);
   // res.sendFile(__dirname + '/views/index.html');
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


io.on('connection', function (socket) {
    console.log('connected');

    if (gameTracker.pendingGame) {
        //connect to game if there is one waiting

        gameTracker.pendingGame = null;

    } else {
        //create game if there wasn't
        var newGameId = uuid.v4();
        //var newGame = game;
        //newGame.createGame(newGameId, socket.id, function(game){
        //    gameTracker.pendingGame = newGameId;
        //    gameTracker.addGame(newGame);
        //
        //
        //});

    }

    socket.emit('gameFound', 1, '124124'  );
    socket.contents = 'test';

    socket.on('event', function (data) {
        console.log('event');
    });



    socket.on('playTurn', function (data) {
        console.log('playTurn');
    });

    socket.on('disconnect', function () {
        console.log('Disconnected');
    });
});

console.log('http://localhost:' + port);
//
//var GameInstance = require('./gameclasstest');
//var bob = new GameInstance('player1');
//
//
//bob.winner = "player 1";
//
//console.log(bob.winner);
//

http.listen(port);


