class OrderInput extends HTMLElement {

    constructor() {
        super();
        this.type = this.getAttribute('type');
        this.id = this.getAttribute('id');
        this.name = this.getAttribute('name');
        this.placeholder = this.getAttribute('placeholder');

        this.render();
    }

    connectedCallback() {
    }

    render() {
        this.innerHTML = `  
        <style> input {width: calc(100% - 50px); display: flex;} </style>
        <input type="${this.type}" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" required></input>
        `;
    }
}

customElements.define("order-input", OrderInput);