const newsTemplate = document.createElement("template");
newsTemplate.innerHTML = `
    <div class="card">
        <img class="picture" src="" alt="">
        <div class="title"></div>
        <div class="description"></div>
        <button> 
            Цааш унших
            <img src="../assets/images/svg/right-arrow-long.svg" />
        </button>
    </div>
`;

class CardNews extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(newsTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "description", "picture"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const card = this.shadowRoot.querySelector(".card");
    if (name === "title") {
      const nameElement = this.shadowRoot.querySelector(".title");
      nameElement.textContent = newValue;
    } else if (name === "picture") {
      const pictureElement = this.shadowRoot.querySelector(".picture");
      pictureElement.setAttribute("src", newValue);
    } else if (name === "description") {
      const priceElement = this.shadowRoot.querySelector(".description");
      priceElement.textContent = newValue;
    }
  }
}

customElements.define("news-card", CardNews);
