const advantageBoxTemplate = document.createElement("template");
advantageBoxTemplate.innerHTML = `
    <div class="card">
        <img class="picture" src="" alt="">
        <div class="title"></div>
        <div class="data"></div>
    </div>
`;

class AdvantageBox extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(advantageBoxTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "picture", "data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const card = this.shadowRoot.querySelector(".card");
    if (name === "title") {
      const nameElement = this.shadowRoot.querySelector(".title");
      nameElement.textContent = newValue;
    } else if (name === "picture") {
      const pictureElement = this.shadowRoot.querySelector(".picture");
      pictureElement.setAttribute("src", newValue);
    } else if (name === "data") {
      const priceElement = this.shadowRoot.querySelector(".data");
      priceElement.textContent = newValue;
    }
  }
}

customElements.define("advantage-box", AdvantageBox);
