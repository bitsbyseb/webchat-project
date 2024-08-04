class MessageElement extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ["text", "userimage", "username","rightside"];

    attributeChangedCallback(current, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[current] = newValue;
        }
    }

    get properties() {
        const { text, userimage, username,rightside } = this;
        return {
            text,
            userimage,
            username,
            rightside
        }
    }



    connectedCallback() {
        this.append(this.template.content.cloneNode(true));
    }

    get template() {
        const template = document.createElement('template');
        const { text, userimage, username,rightside } = this.properties;
        template.innerHTML = `
            <div class="message ${rightside === "true" ? "rightSide" : ""}">

                <div class="imageContainer">
                    <img src="${userimage ? userimage : "/images/userimage.jpg"}" alt="userimage">
                </div>

                <div class="messageBody">

                    <div class="userInfo">
                        <span class="username">${username}</span>
                        <span class="time">a second ago</span>
                    </div>
                    <p>${text}</p>

                </div>

            </div>
        `
        return template;
    }

    disconnectedCallback() {
        this.remove();
    }
}

customElements.define('message-element', MessageElement);