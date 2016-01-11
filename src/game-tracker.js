(function (gameTracker) {
    var uuid = require('node-uuid');
    var socketio = require('socket.io');
    var games = [];
    var pendingGame;
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

    io.sockets.on("connection", function (socket) {
        console.log("socket connected");

        socket.on("newPlayer", gameTracker.addGame);
        socket.on("finishGame", gameTracker.finishGame);
    });
}


gameTracker.addGame = function (game) {
    gameTracker.games[game.id] = game;

}


gameTracker.finishGame = function (game) {
    //create object to save

}


})
(module.exports);
