class MessageElement extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ["text", "userimage", "username", "rightside"];

    connectedCallback() {
        this.append(this.template.content.cloneNode(true));
    }
    attributeChangedCallback(current, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[current] = newValue;
        }
    }

    disconnectedCallback() {
        this.remove();
    }
    /**
     * @typedef imgStructure
     * @property {string} alt
     * @property {string} url
    */
    #extractImages() {
        const imageRegex = /\!\[([a-zA-Z0-9\s]+)\]\((.*)\)/g;
        /**
         * @type {string}
        */
        let text = this.text;
        const match = text.matchAll(imageRegex);
        /**
         * @type {imgStructure[]}
        */
        const images = [];
        for (const img of match) {
            images.push({
                alt: img[1],
                url: img[2]
            });
        }
        this.setAttribute("text", text.replace(imageRegex, ""));
        return images;
    }

    #applyTitleElements() {
        const titleContentRegex = /^[#]{1,6}(.*)$/gm;
        const titleTypeRegex = /^([#]+)/g;
        /**
         * @type {string}
         */
        let text = this.text;
        const elements= [];
         const match = text.matchAll(titleContentRegex);
         for (const input of match) {
            const data = input[1];
            const titleIndex = input.input.match(titleTypeRegex).join('').length;
            elements.push({
                htmlStr:`<h${titleIndex > 6 ? 6 : titleIndex}>${data}</h${titleIndex > 6 ? 6 : titleIndex}>`,
                charToReplace:input.input
            });

        }
         elements.forEach(x => this.setAttribute("text",text.replace(x.charToReplace,x.htmlStr)));
    }

    #applyBoldFont() {
        const boldRegex = /\*\*(.*)\*\*/g;
        /**
         * @type {string}
        */
       let text = this.text;
       const elements= [];
        const match = text.matchAll(boldRegex);
        for (const input of match) {
            elements.push({
                htmlStr:`<b>${input[1]}</b>`,
                charToReplace:`**${input[1]}**`
            });
        }
        elements.forEach(x => this.setAttribute("text",text.replace(x.charToReplace,x.htmlStr)));
    }

    get template() {
        this.#applyBoldFont();
        this.#applyTitleElements();
        const images = this.#extractImages();
        const template = document.createElement('template');
        const { text, userimage, username,rightside} = this;
        // const rightside = this.getAttribute('rightside');
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
                    <p>${text}
                    </p>
                    
                    <div class="userImages">
                    ${images.map(x => {
            return `<img src="${x.url}" alt="${x.alt}"/>`;
        })
            }
                    </div>

                </div>

            </div>
        `
        return template;
    }
}

customElements.define('message-element', MessageElement);