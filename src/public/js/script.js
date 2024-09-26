/**
 * creates a new message html element with the following
 * arguments
 * @param {string} text 
 * @param {string} username 
 * @param {string} userImage
 * @param {"true" | "false"} rightSide
 * @returns {void} 
 */
function showMessage(text, username, userImage = "", rightSide = "false") {
    const messagesContainer = document.querySelector(".allMessages");
    const messageElement = document.createElement('message-element');
    messageElement.setAttribute('text', text);
    messageElement.setAttribute('username', username);
    messageElement.setAttribute('userimage', userImage);
    messageElement.setAttribute('rightside', rightSide);
    messagesContainer.append(messageElement);
}

/**
 * 
 * @param {string} cname 
 * @returns 
 */
function getCookieValue(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const socket = io();
const input = document.querySelector('#message');
const submitButton = document.querySelector('#sendMessage');

submitButton.addEventListener('click', e => {
    e.preventDefault();
    const message = input.value;

    if (Boolean(message)) {
        socket.emit("message", { username: getCookieValue("username"), message, imgUrl: getCookieValue("imgUrl") });
        input.value = "";
        showMessage(message, getCookieValue("username"), getCookieValue("imgUrl"),"false");
    } else {
        alert("empty messages aren't allowed");
    }
});

socket.on('message', ({ username, message, imgUrl }) => {
    showMessage(message, username, imgUrl, "true");
});

