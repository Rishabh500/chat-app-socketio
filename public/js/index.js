
var socket = io();

socket.on('connect', function () {
    console.log('connected to server.');
});

socket.on('disconect', function () {
    console.log('Disconnected from server..');
});

// socket.on('newEmail', function(email){
//     console.log(email);
// });

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = $('<li class="form-group"></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li); 
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li class="form-group"></li>');
    var a = $('<a target="_blank">My current location </a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li); 
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// },  function(){
//     console.log('Got Acknowledgment');
// });

socket.emit('newText', {
    from: 'Frank',
    text: 'Hi'
},  function(msg){
    console.log('Got Acknowledgment ',msg);
});

$(document).ready(function() {
$('#message-form').on('submit', function(e){
    e.preventDefault();
    // console.log($('#text').val());

    socket.emit('newText', {
        from: 'User',
        text: $('#text').val()
    }, function(){

    });
    $('#text').val('');
});
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
    // preventDefault();
    if(!navigator.geolocation){
        return alert('No Gelocation Feature');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position.coords.latitude+' '+position.coords.longitude);
        socket.emit('createLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
    }, function(){
        alert('Not able to fetch location');
    });
});

$('.pull-down').each(function() {
    var $this = $(this);
    $this.css('margin-top', $this.parent().height() - $this.height())
  });
  