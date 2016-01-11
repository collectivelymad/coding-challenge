
//Public
module.exports = GameInstance;

function GameInstance(gameId){

    //public
    this.player1 = null;
    this.player2 = null;

    this.gameId = gameId;

    //private
    this._turns = [];  //we are keeping track of turn events and saving them so we can replay games
    this._gameState = 'Not Started';  /*possible game states :   "Not Started", "Player1 Turn", "Player2 Turn", "Completed"*/
    this._gameOutcome = 'TBD';  /*possible outcomes are "TBD", "Player1 Wins", "Player2 Wins", "Tie Game"*/

    this.turnsTaken = 0;
}
GameInstance.prototype.createGame = function(playerId) {
    this.player1 = playerId;

}

GameInstance.prototype.startGame = function(player2){
    this.player2 = player2;
}