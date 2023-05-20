// const newsTemplate = document.createElement("template");
// newsTemplate.innerHTML = `
//     <div class="card">
//         <img class="picture" src="" alt="">
//         <div class="title"></div>
//         <div class="description"></div>
//         <button> 
//             Цааш унших
//             <img src="../assets/images/svg/right-arrow-long.svg" />
//         </button>
//     </div>
// `;

class CardNews extends HTMLElement {

  image = '';
  altText = '';
  title = '';
  description = '';

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();

    // const shadowRoot = this.attachShadow({ mode: "open" });
    // shadowRoot.append(newsTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["image", "altText", "title", "description"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'image':
        this.image = newValue || '';
        break;
      case 'altText':
        this.altText = newValue || '';
        break;
      case 'title':
        this.title = newValue || '';
        break;
      case 'description':
        this.description = newValue || '';
        break;
    }
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  
    <style>
      .blog-card {
        width: 100%;
        height: 200px;
        display: flex;
        margin: 2em 0;
        padding: 0 1vw;
      }
      .blog-card img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 15%;
      }
      .blog-info {
          padding: 1em;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
      }
      .blog-info h2 {
          margin: 0;
          font-family: 'PT Sans';
      }
      .blog-info p {
          height: 78px;
          text-align: justify;
          overflow: hidden;
          text-overflow: ellipsis;
      }  
      .blog-info button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
      }
      .blog-info button a {
        text-decoration: none;
        color: var(--primary-orange);
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      .blog-info button i {
          font-size: 1.5em;
          margin-left: 8px;
      }
      @media only screen and (max-width: 992px) {
        .blog-info h2{
          font-size: 1rem;
        }
      }
      @media only screen and (max-width: 835px) {
        .blog-card img {
          height: 150px;
          width: 150px;
        }
        .blog-card {
            height: 150px;
        }  
        .blog-info {
            padding: 0.5em 1em;
        }
      }
      @media only screen and (max-width: 768px) {
        .blog-card img {
            height: 200px;
            width: 200px;
        }
        .blog-card {
            height: 200px;
            width: 100%;
        }
        .blog-info h2 {
            font-size: 1.5em;
        }
      }
      @media only screen and (max-width: 560px) {
        .blog-card {
          margin: 1rem 0;
          height: 150px;
        }
        .blog-card img {
            height: 150px;
            width: 150px;
        }
        .blog-info h2 {
            font-size: 1em;
        }
        .blog-info p {
            height: 60px;
        }
      }
    </style>
    <article class="blog-card">
      <img src="${this.image}" class="blog-img" alt="${this.altText}">
      <section class="blog-info">
        <div>
          <h2>${this.title}</h2>
          <p>${this.description}</p>
        </div>
        <button><a href="src/html/blog.html">Цааш унших<i class="material-icons">arrow_forward</i></a></button>
      </section>
    </article>
    `;
  }
}

customElements.define("news-card", CardNews);
