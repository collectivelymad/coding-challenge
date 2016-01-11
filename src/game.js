
(function (game) {
    var uuid = require('node-uuid');
    var socketio = require('socket.io');
    var gameid;
    var board;
    var player1;
    var player2;
    var winner;
    var status;
    var state;


    game.init = function (server) {
        var io = socketio.listen(server);

        io.sockets.on("connection", function (socket) {
            console.log("socket connected");

            //if there are no players
            if (!player1) {
                addPlayer(socket);
                state = "Waiting for Player 2";
            } else {
                addPlayer(socket);

            }

            socket.on("addPlayer", game.addPlayer);
            socket.on("createGame", game.createGame);
            socket.on("playTurn", game.playTurn);
        });


    }


    game.createGame = function (gameId, socketId, next) {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];

        gameid = uuid.v4();

    //    next(err, this);

    }


    game.addPlayer = function (socket) {
        if (!player1) {
            player1 = socket.id;
            gameid = new uuid();
        } else if (player1) {
            player2 = socket.id;
            socket.broadcast.to(gameid).emit("startGame", {gameId: gameid, player1: player1, player2: player2, board: board});
        }
    }


    game.playTurn = function (socket, gameId, playerId, move) {

        board[move.x][move.y] = playerId;


        //save event to db
        //scoreGame(board, function (playerId) {
        //    if (playerId)
        //        });


        socket.broadcast.to(gameId).emit("nextTurn");

    }


    game.endGame = function (gameid, socket) {
        /**
         * Created by michael on 1/4/2016.
         */

        var winPatterns = [
            [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
            [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}],
            [{x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}],
            [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
            [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
            [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}],
            [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}],
            [{x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 3}]];

    };


})(module.exports);


//module.exports.endGame = endGame;

//var board;
//
//var createGame = function () {
//
//}


//var startGame = function () {
//
//}


//var createGame;
//
//createGame = function (player1Id, io) {
//
//
//
//}


//var playTurn = function (socket, gameId, playerId, move) {
//    board[move.x][move.y] = playerid;
//
//
//    //save event to db
//    scoreGame(board, function() {
//        if (t)
//            });
//
//
//    socket.broadcast.emit("next")
//
//}
//
//var endGame;
//endGame = function (gameid, socket) {
//    /**
//     * Created by michael on 1/4/2016.
//     */
//
//    var winPatterns = [
//        [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
//        [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}],
//        [{x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}],
//        [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
//        [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
//        [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}],
//        [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}],
//        [{x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 3}]];
//
//};
//
//var gameStatus = "completed";
//
//
//exports.status = gameStatus;
//
//
