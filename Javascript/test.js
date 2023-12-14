// Listen for messages
socket.addEventListener('message', (event) => {
    const receivedMessage = JSON.parse(event.data);
    console.log('Message from server:', receivedMessage);

    // Append the message to the message container
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML += `<p>${receivedMessage.content}</p>`;
});
