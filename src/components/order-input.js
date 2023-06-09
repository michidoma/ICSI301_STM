class OrderInput extends HTMLInputElement {

    constructor() {
        super();

        // this.attachShadow({mode: 'open'});
        
        this.style.backgroundImage = `url("../../assets/icons/${this.getAttribute('type')}.png")`;


        // this.type = this.getAttribute('type');
        // this.id = this.getAttribute('id');
        // this.name = this.getAttribute('name');
        // this.placeholder = this.getAttribute('placeholder');

        // this.render();
    }

    connectedCallback() {
        if(this.id === 'num_adults') {
            this.addEventListener('input', () => {
                const myTotal = document.querySelector("custom-total");
                myTotal.update_adult(this.value);
            })
        }
        if(this.id === 'num_children') {
            this.addEventListener('input', () => {
                const myTotal = document.querySelector("custom-total");
                myTotal.update_child(this.value);
            })
        }
    }

    // render() {
    //     this.shadowRoot.innerHTML = `  
    //     <style>
    //     input {
    //         background-color: var(--gray-input);
    //         background-image: url('../../assets/icons/${this.type}.png');
    //         background-position: 15px;
    //         background-repeat: no-repeat;
    //         background-size: var(--icon-size);
    //         border: 0px;
    //         border-radius: 10px;
    //         margin: 10px 0px;
    //         padding: 15px 0px 15px 50px;
    //         width: calc(100% - 50px);
    //     }
    //     input::placeholder {
    //         color: var(--primary-text);
    //     }
    //     </style>
    //     <input type="${this.type}" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" required></input>
    // `;
    // }
}

customElements.define("order-input", OrderInput, {extends: "input"});