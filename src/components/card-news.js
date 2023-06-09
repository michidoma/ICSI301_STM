class CardNews extends HTMLElement {

  constructor() {
    super();

    /*this.image = '';
    this.altText = '';
    this.title = '';
    this.description = '';*/
  
    this.attachShadow({ mode: "open" });
    this.addEventListener('click', this.handleClick.bind(this));

    this.render();
  }

  /*static get observedAttributes() {
    return ["image", "altText", "title", "description"];
  }*/

  static get observedAttributes() {
    return ['travel-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'travel-id') {
      this.render();
    }
  }

  handleClick() {
    const travelId = this.getAttribute('travel-id');

    // Navigate to the travel-details page with the corresponding travel ID
    window.location.href = `travel-details.html?travelid=${travelId}`;
  }

  /*attributeChangedCallback(name, oldValue, newValue) {
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
  }*/

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  
    <style>
      article {
        display: flex;
      }
      article img {
        border-radius: 15%;
        height: var(--img-large);
        object-fit: cover;
        width: var(--img-large);
      }
      .blog-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1em;
      }
      .blog-info h2 {
        margin: 0;
      }
      .blog-info p {
        height: 78px;
        overflow: hidden;
        text-align: justify;
        text-overflow: ellipsis;
      }
      .blog-info button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        padding: 0;
      }
      .blog-info button a {
        align-items: center;
        color: var(--primary-orange);
        display: flex;
        font-family: var(--font-family-main);
        font-weight: 600;
        text-decoration: none;
      }
      .blog-info button i {
        font-size: var(--font-size-header-card);
        margin-left: var(--icon-margin);
      }
      @media only screen and (max-width: 992px) {
        .blog-info h2 {
          font-size: var(--size-root);
        }
      }
      @media only screen and (max-width: 835px) {
        article img {
          height: 150px;
          width: 150px;
        }
        .blog-info {
            padding: 0.5em 1em;
        }
      }
      @media only screen and (max-width: 768px) {
        article img {
          height: var(--img-large);
		      width: var(--img-large);
        }
        .blog-info h2 {
            font-size: var(--font-size-header-card);
        }
      }
      @media only screen and (max-width: 560px) {
        article img {
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
    <article>
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
