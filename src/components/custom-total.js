class Total extends HTMLElement {

    constructor() {
        super();

        this.adultCount = 0;
        this.childCount = 0;
        this.total = 0;

        this.render();
    }

    render() {
        this.innerHTML = `<span>Нийт дүн: ${this.total}₮</span>`;
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
        this.total = this.adultCount * 2000 + this.childCount * 1000;
        this.render();
    }
}

customElements.define("custom-total", Total);