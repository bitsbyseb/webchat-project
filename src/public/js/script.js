/**
 * creates a new message html element with the following
 * arguments
 * @param {string} text 
 * @param {string} username 
 * @param {string} userImage
 * @param {"true" | "false"} rightSide
 * @returns {void} 
 */
function showMessage(text, username, userImage = "",rightSide = "false") {
    const messagesContainer = document.querySelector(".allMessages");
    const messageElement = document.createElement('message-element');
    messageElement.setAttribute('text', text);
    messageElement.setAttribute('username', username);
    messageElement.setAttribute('userImage', userImage);
    messageElement.setAttribute('rightside',rightSide);
    messagesContainer.append(messageElement);
}

function getCurrentUsername() {
    const cookies = document.cookie;
    const valueRegex = /username\=(.*)/g;
    let username = "";
    for (let match of cookies.matchAll(valueRegex)) {
        username += match[1];
    }
    return username;
}

const socket = io();
const input = document.querySelector('#message');
const submitButton = document.querySelector('#sendMessage');

submitButton.addEventListener('click', e => {
    e.preventDefault();
    const message = input.value;

    if (Boolean(message)) {
        socket.emit("message", { username: getCurrentUsername(), message, });
        input.value = "";
        showMessage(message, getCurrentUsername(),"");
    } else {
        alert("empty messages aren't allowed");
    }
});

socket.on('message', ({ username, message }) => {
    showMessage(message, username,"","true");
});

