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
    .box .logo {
      width: 50px;
      height: 50px;
    }
    .box ::slotted([slot="title"]), .box ::slotted([slot="data"]) {
      margin: 5px 0px !important;
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
      <slot name="image"></slot>
      <div class="information">
        <slot name="title"></slot>
        <slot name="data"></slot>
      </div>
    </div>
  `;
  }
}

customElements.define("information-box", InformationBox);