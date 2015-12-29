//storing values in mongodb
var mongodb = require("mongoose");

console.log("starting");

//set port from environment
var port = process.env.PORT || 3000;

var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function (socket) {    
    console.log("connected");

    socket.contents = "test";
    
    socket.on('event', function (data) {
        console.log("event");            
    });
    socket.on('disconnect', function () {
        console.log("Disconnected");
    });
});
server.listen(port);


