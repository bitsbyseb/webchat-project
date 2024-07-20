class MessageElement extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ["text", "userImage", "username","rightside"];

    attributeChangedCallback(current, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[current] = newValue;
        }
    }

    get properties() {
        const { text, userImage, username,rightside } = this;
        return {
            text,
            userImage,
            username,
            rightside
        }
    }



    connectedCallback() {
        this.append(this.template.content.cloneNode(true));
    }

    get template() {
        const template = document.createElement('template');
        const { text, userImage, username,rightside } = this.properties;
        template.innerHTML = `
            <div class="message ${rightside === "true" ? "rightSide" : ""}">

                <div class="imageContainer">
                    <img src="${userImage ?? "/images/userImage.jpg"}" alt="userImage">
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

    }
}

customElements.define('message-element', MessageElement);