'use strict';

var express  = require('express');
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

var server = app.listen(3000, function(){
  console.log('server listening on port 3000');
});

var io = socketio(server);

io.on('connection', function(socket){
  console.log('Client connected:', socket.id);

  socket.on('disconnect', function(){
    console.log('Client disconnected:', socket.id);
  });

  socket.on('chatMessage', function(msg){
    console.log('Chat Message recieved', msg);
    // to one socket
    // socket.emit('chatMessage', {toOne : msg});
    // to everyone except the sender
    // socket.broadcast.emit('chatMessage', {toOthers : msg});
    //to everyone
    io.emit('chatMessage', msg);
  });
});

