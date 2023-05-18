class NewsItem {
  constructor(news) {
    this.id = news.id;
    this.title = news.title;
    this.content = news.content;
    this.image = news.image;
    this.altText = news.altText;
  }

  Render() {
    return `
    <article>
      <img src="${this.image}" alt="${this.altText}">
      <section class="blog-info">
        <div>
          <h2>${this.title}</h2>
          <p>${this.content}</p>
        </div>
        <button><a href="src/html/blog.html">Цааш унших<i class="material-icons">arrow_forward</i></a></button>
      </section>
    </article>
    `;
  }
}

export default class CardNews {
  constructor(recentNewsUrl) {
    this._recentNewsList = [];
    this._recentNewsURL = recentNewsUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  fetchAndRender(targetElement) {
    console.log("this._activeTravelsURL", this._recentNewsURL);
    fetch(this._recentNewsURL)
      .then((result) => {
        result.json().then((jsonObject) => {
          console.log("RESULT", jsonObject);
          // json record -> news болгосон
          const filteredArray = jsonObject.news.sort((a, b) => new Date(b.date) - new Date(a.date))
          .filter((_, index) => index < 4);

          if (filteredArray.length > 0) {
            document.getElementById(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredArray
                .map((travelItem) => {
                  const _newsItem = new NewsItem(travelItem);
                  this._recentNewsList.push(_newsItem);
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

const activeTravels = new CardNews(
  "../../db.json"
);
activeTravels.fetchAndRender("blog-container");

// setInterval(() => {
//   activeTravels.fetchAndRenderNews("blog-container")
// }, 60000);
// setInterval(() => {
//   activeTravels.upload()
// }, 15000);