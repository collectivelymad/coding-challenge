var uuid = require('node-uuid');
//Public
module.exports = GameInstance;

function GameInstance(player1) {

    //public
    this.gameId = uuid.v4();
    this.player1 = player1;
    this.player2 = null;

    //private
    this._turns = [];  //we are keeping track of turn events and saving them so we can replay games
    this._gameState = 'Not Started';
    /*possible game states :   "Not Started", "Player1 Turn", "Player2 Turn", "Completed"*/
    this._gameOutcome = 'TBD';
    /*possible outcomes are "TBD", "Player1 Wins", "Player2 Wins", "Tie Game"*/
    this._board = [];


    this._board.push(['', '', '']);
    this._board.push(['', '', '']);
    this._board.push(['', '', '']);


    this.turnsTaken = 0;
}


GameInstance.prototype.startGame = function (player2, next) {
    this.player2 = player2;
    this._gameState = "Player1 Turn";

    //set up board state


    console.log(this._board);

    next(this);
};


GameInstance.prototype.playTurn = function (data, playerId, next) {

    var gamePiece = 0;
    var newState ='';
    data.playerId = playerId;

    this._turns.push(data);

    if (this.player1 == data.playerId){
        gamePiece = 1;
        this._gameState = "Player2 Turn";
        this._board[data.row-1][data.col-1] = 1;
        console.log("new board value" + this._board[data.row-1][data.col-1]);

    } else if (this.player2 == data.playerId){
        gamePiece = 2;
        this._gameState = "Player2 Turn";
        this._board[data.row-1][data.col-1] = 2;
        console.log("new board value" + this._board[data.row-1][data.col-1]);
        //this.checkScore(2, next);
    }

    this.checkScore(gamePiece, next);


};


GameInstance.prototype.checkScore = function(playerId, next){
    console.log("checkScore " + playerId);
    var matches = 0;
    var winPatterns = [
        [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
        [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}],
        [{x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}],
        [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
        [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
        [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}],
        [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}],
        [{x: 3, y: 1}, {x: 2, y: 2}, {x: 1, y: 3}]];


    for (var i = 0; i < winPatterns.length; i++) {
        matches = 0;

        var winPattern = winPatterns[i];

        if(this._board[winPatterns[i][0].x-1][winPattern[0].y-1] == playerId &&
            this._board[winPattern[1].x-1][winPattern[1].y-1] == playerId &&
            this._board[winPattern[2].x-1][winPattern[2].y-1]== playerId ){
            matches++;
            break;
        }
    }

    if(matches==1){
        console.log("Matches" + matches);
        next({ playerId: playerId, nextAction:'Player Won'});


    }
    else {
        console.log(matches);
        next({ playerId: playerId, nextAction:'Next Player'} );
    }
};
