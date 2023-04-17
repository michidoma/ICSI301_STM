class InformationBox extends HTMLElement {

  title = '';
  logo = '';
  data = '';

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.render();
  }

  connectedCallBack() {
    console.log("mounted");
  }

  static get observedAttributes() {
    return ["title", "logo", "data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("new ", name, " ", newValue)
    switch (name) {
      case 'title':
        this.title = newValue || '';
        break;
      case 'logo':
        this.logo = newValue || '';
        break;
      case 'data':
        this.data = newValue || '';
        break;
    }
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .box {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .box img {
        width: 80px;
        height: 80px;
      }
      p, h1 {
        margin: 5px 0px;
      }
    </style>
    <div class="box">
      <img src="${this.logo}" />
      <div class="information">
        <p>${this.title}</p>
        <h1>${this.data}</h1>
      </div>
    </div>
  `;
  }
}

customElements.define("information-box", InformationBox);