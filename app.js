const express = require('express');
const app = express();
const socket = require('socket.io');
const port = process.env.PORT || 4000;

// start server listen to port
let server = app.listen(port, () => {
    console.log('listening at port', port);
});

app.use(express.static('public'));

let io = socket(server);
io.on("connection", function(socket) {
    socket.on('getMessage', function(data) {

    });
//  listen when user send message
    socket.on('sendMessage', function(data){
        io.sockets.emit('sendMessage', data);
    });
//  listen when user typing 
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});
