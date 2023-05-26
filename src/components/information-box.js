class InformationBox extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.render();
  }

  static get observedAttributes() {
    return ["mytitle", "logo", "data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'mytitle':
        this.mytitle = newValue || '';
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
        <p>${this.mytitle}</p>
        <h1>${this.data}</h1>
      </div>
    </div>
  `;
  }
}

customElements.define("information-box", InformationBox);