 

var io = require('socket.io')(3888);
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res)
{
    res.send('hello');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connect', function(a){
  
    console.log("tst");
    console.log(a);
  
});