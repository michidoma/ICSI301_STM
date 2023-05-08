class NewsItem {
  constructor(news) {
    this.id = news.id;
    this.title = news.title;
    this.description = news.description;
    this.image = news.image;
    this.altText = news.altText;
  }

  Render() {
    return `
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
    <div class="news-card">
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
    </div>
    `;
  }
}

export default class CardNews {
  constructor(recentNewsUrl) {
    this._newsList = [];
    this._newsURL = recentNewsUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  download(targetElement) {
    console.log("this._activeTravelsURL", this._newsURL);
    fetch(`${this._newsURL}`)
      .then((result) => {
        result.json().then((jsob) => {
          console.log("RESULT", jsob);
          const filteredArray = jsob.record.filter(
            (travelItem) => travelItem.status == "active"
          );

          if (filteredArray.length > 0) {
            gebi(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredArray
                .map((travelItem) => {
                  const _newsItem = new NewsItem(travelItem);
                  this._newsList.push(_newsItem);
                  return _newsItem.Render();
                })
                .reduce((prevVal, curVal) => prevVal + curVal, "")
            );
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const gebi = (id) => document.getElementById(id);

const activeTravels = new CardNews(
  "https://api.jsonbin.io/v3/b/6458fb5a9d312622a35a10d8"
);
activeTravels.download("blog-container");
// setTimeout(() => {
//   document.querySelectorAll("blog-card").forEach(function (customCard) {
//     customCard.addEventListener("click", function () {
//       window.location.href = "src/html/travel-details.html";
//     });
//   });
// }, 1000);
document.addEventListener("DOMContentLoaded", () => {});
