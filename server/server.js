const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');
    
    socket.emit('newEmail',{
        'to':'rishabh.j50@gmail.com',
        'text':'hello'
    });

    socket.emit('newMessage',{
        from:'abc',
        text:'hello',
        createdAt:12
    });


    socket.on('createMessage', (message)=>{
        console.log('create msg',message);
    })
    socket.on('disconect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log('Server started on port ' + port);
});
