class Total extends HTMLElement {

    constructor() {
        super();

        this.adultCount = 0;
        this.childCount = 0;
        this.total = 0;
        this.price = this.getAttribute('price');

        this.render();
    }

    render() {
        this.innerHTML = `<span>Нийт дүн: ${this.total.toLocaleString()+'₮'}</span>`;
    }

    update_adult(value) {
        this.adultCount = value;
        this.compute_total();
    }

    update_child(value) {
        this.childCount = value;
        this.compute_total();
    }

    compute_total() {
        this.total = this.adultCount * this.price + this.childCount * this.price / 2;
        this.render();
    }
}

customElements.define("custom-total", Total);