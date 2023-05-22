class News {
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

export default class LatestNews {
  constructor(jsonUrl, count) {
    this._recentNewsList = [];
    this._jsonUrl = jsonUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
    this._displayCount = count;
  }

  fetchAndRender(targetElement) {
    fetch(this._jsonUrl)
      .then((result) => {
        result.json().then((jsonObject) => {
          // json record -> news болгосон
          // Хамгийн сүүлд нийтлэгдсэн _displayCount ширхэг мэдээг шүүж авах
          const filteredArray = jsonObject.news.sort((a, b) => new Date(b.date) - new Date(a.date))
          .filter((_, index) => index < this._displayCount);

          if (filteredArray.length > 0) {
            document.getElementById(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredArray
                .map((newsItem) => {
                  const _newsItem = new News(newsItem);
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

// setInterval(() => {
//   activeTravels.fetchAndRenderNews("blog-container")
// }, 60000);
// setInterval(() => {
//   activeTravels.upload()
// }, 15000);