///turn counter changes the state of the board for the odd user and even user
var turnsPlayed = 0;
var player = 0;


var gamePiece = '';
var opponentGamePiece = '';
var gameIdentifier;
var uiEnabled = true;
var socket = io.connect('http://localhost:8080/');

socket.on('connect', function (playerNum) {
    socket.emit('newPlayer');
});

socket.on('gameFound', function (data) {

    player = data.playerNum;
    gameIdentifier = data.gameId;


    if (player == 1){
        gamePiece = 'X';
        opponentGamePiece = 'O';
    }else {
        gamePiece = 'O';
        opponentGamePiece = 'X';
        startGame();
        socket.emit('startGame', { gameId: gameIdentifier} );
    }

    console.log("game id for this user= " + gameIdentifier);
});

socket.on('startGame', function()
{
    startGame();
});

//hook buttons to emit events.
socket.on('nextPlayer', function (data) {
    turnsPlayed++;

    console.log(turnsPlayed);
    if(turnsPlayed == 9){
        showTieGame();

    }

    if (data.playerId == socket.id)
        return;

    updateUI(data.col, data.row, opponentGamePiece);
    unlockPage();

});


socket.on("playerWon", function(data){
    alert("playerWon");
    showPlayerWon(data.playerId);
    if (data.playerId == socket.id)
        return;

    updateUI(data.col, data.row, opponentGamePiece);
});

playTurn = function (x, y) {
    if (!uiEnabled)
        return;

    var data = {
        gameId: gameIdentifier,
        action: 'turn_played',
        playerId: socket.id,
        col: x,
        row: y
    };

    turnsPlayed++;


    console.log("play Turn data" + data);

    socket.emit('playTurn', data);

    updateUI(x, y, gamePiece);
    lockPage();
};

showTieGame = function(){
    $('#welcome').hide();
    $('#board').hide();
    $('#tie').show();

    socket.emit("tieGame", gameIdentifier);

};

socket.on("showTieGame", showTieGame);

showPlayerWon = function(playerId){
    $('#welcome').hide();
    $('#board').hide();

    if(playerId == 1){
        $('#won').show();
    }
    else
    {
        $('#lose').show();
    }


}


updateUI = function (x, y, piece) {
    var key = "#c" + y + "_" + x;
    var elm = $(key).find('img');
    elm.attr('src', getImageUrl(piece));
};

lockPage = function () {
    uiEnabled = false;
};

unlockPage = function () {
    uiEnabled = true;
};

getImageUrl = function (gamePiece) {
    return '/img/' + gamePiece + '.png';
};


startGame = function () {
    $('#welcome').hide();
    $('#board').show();

    if(player == 1)
        unlockPage();
    else
        lockPage();

    console.log('ran startGame');
};


