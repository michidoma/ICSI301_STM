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
      // width: 100%;
      width: fit-content;
      display: flex;
      align-items: center;
      margin-bottom: 2vh;
      gap: 20px;
    }
    .box img {
      width: 50px;
      height: 50px;
    }
    p, h1 {
      margin: 5px 0px;
    }
    @media only screen and (max-width: 520px) {
      .box {
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
      }
    }
    </style>
    <div class="box">
      <img src="${this.logo}" alt="statistics"/>
      <div class="information">
        <p>${this.title}</p>
        <h1>${this.data}</h1>
      </div>
    </div>
  `;
  }
}

customElements.define("information-box", InformationBox);