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
      <h2>${this.altText}</h2>
      <p>${this.duration}</p>
    </section>
    `;
  }
}

export default class ActiveTravels {
  constructor(jsonUrl) {
    this._activeTravelsList = [];
    this._jsonUrl = jsonUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  renderUpcomingTravels(targetElement) {
    fetch(this._jsonUrl)
      .then((result) => {
        result.json().then((jsonObject) => {
          // Удахгүй эхлэх аяллуудыг шүүх
          const dateNow = new Date();
          const futureDate = new Date();
          futureDate.setDate(dateNow.getDate() + 30);
          const upcomingTravels = jsonObject.travels.filter(travel => {
            const travelStartDate = new Date(travel.startDate);
            return travel.status == "active" && travelStartDate > dateNow && travelStartDate <= futureDate;
          });

          if (upcomingTravels.length > 0) {
            console.log('upcomingTravels :>> ', upcomingTravels);
            document.getElementById(targetElement).insertAdjacentHTML(
              "afterbegin",
              upcomingTravels
                .map((travelItem) => {
                  const _travelItem = new Travel(travelItem);
                  this._activeTravelsList.push(_travelItem);
                  return _travelItem.Render();
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

// setTimeout(() => {
//   document.querySelectorAll('.custom-card').forEach(function(customCard) {
//     customCard.addEventListener('click', function() {
//       window.location.href = 'src/html/travel-details.html';
//     })
//   })
// }, 1000);