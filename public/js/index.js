
var socket = io();

socket.on('connect', function () {
    console.log('connected to server.');

    socket.emit('createMessage',{
        from: 'Rishabh',
        text:' Hi, its working'
    });
});

socket.on('disconect', function () {
    console.log('Disconnected from server..');
});

socket.on('newEmail', function(email){
    console.log(email);
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
})