// grab the things we need
var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    gameId: String,
    moves: [],
    finalBoard: [],
    winner: String,
    player1: String,
    player2: String
});

var GameModel = mongoose.model('game', gameSchema);

module.exports = GameModel;


