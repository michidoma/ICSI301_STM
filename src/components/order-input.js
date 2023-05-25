class OrderInput extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.type = this.getAttribute('type');
        this.id = this.getAttribute('id');
        this.name = this.getAttribute('name');
        this.placeholder = this.getAttribute('placeholder');

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `  
        <style>
            
        </style>
        <input type="${this.type}" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" required></input>
    `;
    }
}

customElements.define("order-input", OrderInput);