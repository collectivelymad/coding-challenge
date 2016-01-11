(function (gameTracker) {
    var uuid = require('node-uuid');
    var socketio = require('socket.io');
    var GameInstance = require('./game');
    var mongoose = require('mongoose');
    var games = [];
    var pendingGameId;
    var completedGames;
    var winPatterns = [
        [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
        [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}],
        [{x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}],
        [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
        [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
        [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}],
        [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}],
        [{x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 3}]];


    gameTracker.init = function (io) {

        io.sockets.on('connection', function (socket) {

            socket.on('newPlayer', function () {

                var game;
                var playerNum = 0;

                if (!pendingGameId) {
                    playerNum = 1;
                    game = new GameInstance(socket.id);
                    pendingGameId = game.gameId;
                } else {
                    playerNum = 2;
                    game = games[pendingGameId];
                    //game.startGame(socket.id, null);
                    game.player2 = socket.id;
                    pendingGameId = null;
                }

                games[game.gameId] = game;

                var data = {playerNum: playerNum, gameId: game.gameId};



                socket.join(game.gameId, function () {
                    socket.emit('gameFound', data);
                    //console.log(data);
                });


                //socket.contents = 'test';
                //socket.broadcast.to(game.gameId).emit("startGame", {gameId: game.gameId, player1: game.player1, player2: game.player2, board: game.board});
                //console.log("ran on newPlayer server");
            });

            socket.on("finishGame", gameTracker.finishGame);

            socket.on('playTurn', function (data) {
                //function to update game board
                games[data.gameId].playTurn(data, socket.id, function (action) {
                    //function to broadcast

                        if (action.nextAction == "Player Won") {
                            console.log("player Won");
                            socket.broadcast.to(data.gameId).broadcast.emit("playerWon", data);
                        } else if (action.nextAction == "Next Player") {
                            console.log("Next Player");
                            socket.broadcast.to(data.gameId).emit("nextPlayer", data);
                        }
                });
            });

            socket.on("startGame", function (data) {
                socket.broadcast.to(data.gameId).emit("startGame");
                //console.log("ran onStartGame" + data.gameId);
            });

            socket.on('tieGame', function(gameIdentifier){
                socket.broadcast.to(gameIdentifier).emit("showTieGame");
            });

            socket.on('disconnect', function () {
                console.log('Disconnected');
            });
        });
    };

    gameTracker.finishGame = function (socket) {
        //create object to save
        // if our user.js file is at app/models/user.js

        var GameModel = require('./model/game-model');

// create a new user called chris
        var gameModel = new GameModel({
            gameId: '',
            moves: [],
            finalBoard: [],
            winner: 'player1',
            player1: '',
            player2: ''
        });

// call the built-in save method to save to the database
        gameModel.save(function (err) {
            if (err) throw err;
            console.log('Game saved successfully!');
        });


        gameModel.find(function (err, games) {
            if (err) return console.error(err);
            console.log(games);
        })

    };
})(module.exports);
