




///turn counter changes the state of the board for the odd user and even user
var turnsplayed = 0;
var player = 1;


var gamePiece;
var gameIdentifier
var uiEnabled = true;
var socket = io.connect('http://localhost:8080/');

socket.on('connect', function (playerNum) {
    console.log('connection');
});

socket.on('gameFound', function(playerNum, gameId){

    if (playerNum == 1) {
        gamePiece = 'X';
    }
    else {
        gamePiece = 'O';
    }
    gameIdentifier = gameId;


    startGame()

});


socket.on('disconnect', function () {
    console.log('disconnected');
});

//hook buttons to emit events.
socket.on('nextPlayer', function () {
    console.log('on to the next one');
});


playTurn = function (x, y) {
    if (!uiEnabled)
        return;
    var data = {
        action: 'turn_played',
        id: socket.id,
        col: x,
        row: y
    };


    console.log('emmit next player');

    console.log(data);

    console.log(socket);

    socket.emit('playTurn', data);


    updateUI(x, y);
    lockPage;


}


updateUI = function(x, y)
{
    var key = "#c" + x + "_" + y;
    var elm = $(key).find('img');
    elm.attr('src', getImageUrl(gamePiece));
}

lockPage = function () {
    uiEnabled = false;
}

unlockPage = function () {
    uiEnabled = true;
}

getImageUrl = function(gamePiece){
    return '/img/' + gamePiece + '.png';
}


init = function(){
    $('#board').hide();
    $('#welcome').show();
    console.log("ran init");
}

startGame = function(){
    $('#welcome').hide();
    $('#board').show();
    console.log('ran startGame');
}



$( document ).ready(function() {
    init();
});