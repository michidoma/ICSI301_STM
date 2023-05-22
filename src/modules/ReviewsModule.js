class Review {
  constructor(review) {
    this.id = review.id;
    this.author = review.author;
    this.reviewContent = review.review;
    this.date = review.date;
  }

  Render() {
    return `
    <li class="c_slide">
      <div class="c_slide-content-feedback">
        <div class="feedback">
          <i>
            “${this.reviewContent}“
          </i>
        </div>
        <div class="author"><p><i>Б. Энгүүлэн</i></p></div>
      </div>
    </li>
    `;
  }
}

export default class Reviews {
  constructor(jsonUrl) {
    this._reviewsList = [];
    this._jsonURL = jsonUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  fetchAndRender(targetElement) {
    fetch(this._jsonURL)
      .then((result) => {
        result.json().then((jsonObject) => {
          const reviewsArray = jsonObject.reviews;
          if (reviewsArray.length > 0) {
            document.getElementById(targetElement).insertAdjacentHTML(
              "afterbegin",
              reviewsArray.map((reviewItem) => {
                const _reviewItem = new Review(reviewItem);
                this._reviewsList.push(_reviewItem);
                return _reviewItem.Render();
              }).reduce((prevVal, curVal) => prevVal + curVal, "")
            );
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
