var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, function(){
  console.log('Servidor iniciado com sucesso !');
});


io.on('connection', function(socket){
  console.log('connection');
  socket.on('disconnect', function(){
    console.log('diconnect');
    
  });
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

