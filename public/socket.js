let socket = io.connect('http://localhost:4000'),
    btn = document.getElementById('sub'),
    name = document.getElementById('handle'),
    message = document.getElementById('message'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    form = document.getElementById('form')

function onSubmitForm() {
    socket.emit('sendMessage', {
        name: name.value,
        message: message.value
    });
    message.value = '';
    return false;
};

// broadcast any user that is typing to server
message.addEventListener('keypress', function() {
    socket.emit('typing', name.value);
});

// listen to server event and send message to each users who are in the chat
socket.on('sendMessage', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.name}: </strong>${data.message}</p>`;
});

// listen to server event and show who is typing to each users who are in the chat without the user himself
socket.on('typing', function(data) {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
});
