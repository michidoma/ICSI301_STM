class Card extends HTMLElement {

  title = '';
  picture = '';
  price = '';
  date = '';

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // shadowRoot.innerHTML = `
    //   <div class="custome-card">
    //     <h2>My post title </h2>
    //     <p>Lorem ipsum dolor sit amet</p>
    //     <a href=""> learn more </a>
    //   </div>
    // `
    this.render();
  }

  connectedCallBack() {
    console.log("mounted");
  }

  static get observedAttributes() {
    return ["title", "picture", "price", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const card = this.shadowRoot.querySelector(".card");

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
      .card {
        flex: 1 0 25%;
        width: 100%;
        padding: 20px;
        text-align: center;
      }
      .card-container {
        cursor: pointer;
      }
      .picture {
        width: 250px;
        height: 320px;
        border-radius: 25px;
        background-image: url(${this.picture});
        background-repeat: no-repeat;
        background-size: cover;
        color: #fff;
        font-size: 20px;
        display: flex;
        justify-content: flex-end;
      }
      .price {
        margin: .8rem;
        font-weight: bold;
        text-shadow: #000 1px 0 10px;
      }
      .bottom {
        text-align: start;
      }
      p {
        margin: 5px 0px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
      }
      .date {
        opacity: .6;
      }
      @media only screen and (max-width: 1430px) {
        .picture {
          width: 220px;
          height: 290px;
          transition: .5s;
        }
      }
    </style>
    <div class="card">
      <div class="card-container">
        <div class="picture">
          <div class="price">${this.price}</div>
        </div>
        <div class="bottom">
          <p class="title">${this.title}</p>
          <p class="date">${this.date}</p>
        </div>
      </div>
    </div>
  `;
  }
}

customElements.define("custom-card", Card);

{
  const cardContainer = document.querySelector("custom-card");
  console.log("ELLLL => ", cardContainer.shadowRoot);
}
// customElements.whenDefined('custom-card').then(() => {
// } )
