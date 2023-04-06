const template = document.createElement("template");
template.innerHTML = `
    <div class="card">
        <img class="picture" src="" alt="">
        <div class="name"></div>
        <div class="date"></div>
        <div class="price"></div>
    </div>
`;

class Card extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["name", "picture", "price", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const card = this.shadowRoot.querySelector(".card");
    if (name === "name") {
      const nameElement = this.shadowRoot.querySelector(".name");
      nameElement.textContent = newValue;
    } else if (name === "picture") {
      const pictureElement = this.shadowRoot.querySelector(".picture");
      pictureElement.setAttribute("src", newValue);
    } else if (name === "price") {
      const priceElement = this.shadowRoot.querySelector(".price");
      priceElement.textContent = newValue;
    } else {
        const priceElement = this.shadowRoot.querySelector(".date");
      priceElement.textContent = newValue;
    }
  }
}

customElements.define("travel-card", Card);
