const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New User Connected');

    // socket.emit('newMessage', generateMessage('Admin','Welcome to chat app'));

    // socket.emit('newEmail',generateMessage('Admin','New User Joined..')); 
    
    // socket.on('createMessage', (message,callback) => {
    //     console.log('create msg', message);
    //     io.emit('newMessage', generateMessage(message.from, message.text));
    //     console.log(callback);
    //     // return callback();
    //     // socket.broadcast.emit('newMessage',{
    //     //     from: message.from,
    //     //     text: message.text,
    //     //     createdAt: new Date().getTime()
    //     // })
    // });

    socket.on('newText', (message,callback) => {
        // console.log('create msg', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('From Server');
        // return callback();
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });
    // socket.on('disconect', () => {
    //     console.log('User was disconnected.');
    // });
    
    socket.on('createLocation', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat,coords.long));
    });
});


server.listen(port, () => {
    console.log('Server started on port ' + port);
});
