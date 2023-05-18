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
          const filteredArray = jsob.news.filter(
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
  "../../db.json"
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
