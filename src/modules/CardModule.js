class Travel {
  constructor(travelItem) {
    this.id = travelItem.id;
    this.image = travelItem.image;
    this.altText = travelItem.altText;
    this.price = travelItem.price;
    this.title = travelItem.title;
    this.duration = travelItem.duration;
  }

  Render() {
    return `
    <section class="card">
      <img src="${this.image}" alt="${this.altText}">
      <span>${this.price}</span>
      <h2>${this.title}</h2>
      <p>${this.duration}</p>
    </section>
    `;
  }

  // Bind(eventType, element, property) {
  //   document.getElementById(`${element}_${this.id}`).addEventListener(eventType, (event) => {
  //     this[property] = event.target.innerHTML;
  //     Travel._hasChanged = true;
  //   })
  //   return this;
  // }
}

export default class ActiveTravels {
  constructor(jsonUrl) {
    this._activeTravelsList = [];
    this._jsonUrl = jsonUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  // Upload() {
  //   if(this._hasChanged) {
  //     fetch(this._jsonUrl, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-type': 'application/json;charset=utf-8',
  //         'versioning': false
  //       },
  //       body: JSON.stringify(this._activeTravelsList)
  //     }).then(response => {console.log(response.status);})
  //       .catch(err => {console.log(err)});
  //     this._hasChanged = false;
  //   }
  // }

  renderUpcomingTravels(targetElement) {
    fetch(this._jsonUrl)
      .then((result) => {
        result.json().then((jsonObject) => {
          // Удахгүй эхлэх аяллуудыг шүүх
          const dateNow = new Date();
          const futureDate = new Date();
          // 30 хоногийн доторх аяллуудыг удахгүй эхлэх гэж үзсэн
          futureDate.setDate(dateNow.getDate() + 30);
          const upcomingTravels = jsonObject.travels.filter(travel => {
            const travelStartDate = new Date(travel.startDate);
            return travel.status == "active" && travelStartDate > dateNow && travelStartDate <= futureDate;
          });
          upcomingTravels.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

          if (upcomingTravels.length > 0) {
            const tempArray = [];
            document.getElementById(targetElement).insertAdjacentHTML(
              "afterbegin",
              upcomingTravels
                .map((travelItem) => {
                  const _travelItem = new Travel(travelItem);
                  // this._activeTravelsList.push(_travelItem);
                  tempArray.push(_travelItem);
                  return _travelItem.Render();
                })
                .reduce((prevVal, curVal) => prevVal + curVal, "")
            );

            // this._activeTravelsList.forEach(travelItem => travelItem.Bind("input", "recentnews_title", "title"));
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