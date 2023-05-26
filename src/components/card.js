class Card extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["title", "picture", "price", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.title = newValue || '';
        break;
      case 'picture':
        this.picture = newValue || '';
        break;
      case 'price':
        this.price = newValue || '';
        break;
      case 'date':
        this.date = newValue || '';
        break;
    }
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .card img {
        border-radius: var(--border-size);
        transition: box-shadow 0.3s ease-in-out;
        width: 100%;
      }
      .card span {
        color: var(--text-color-white);
        font-size: 1.3em;
        font-weight: bold;
        margin: .8em;
        position: absolute;
        right: 0;
        text-shadow: #000 1px 0 10px;
      }
      .card h2 {
        font-size: var(--font-size-header-card);
        margin-bottom: 0;
      }
      .card p {
        font-size: 1em;
        margin: 0;
        opacity: .6;
      }
      .card:hover {
        cursor: pointer;
      }
      .card:hover img {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
      }
      @media only screen and (max-width: 1024px) {
        .card span {
          font-size: 1.2em;
        }
      }
      @media only screen and (max-width: 768px) {
        .card span {
          font-size: 1em;
        }
        .card h2 {
          font-size: 1.2em;
        }
      }
    </style>
    <section class="card">
      <img src="${this.picture}" alt="${this.title}">
      <span>${this.price.toLocaleString()+'₮'}</span>
      <h2>${this.title}</h2>
      <p>${this.date}</p>
    </section>
  `;
  }
}

customElements.define("custom-card", Card);