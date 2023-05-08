class TravelItem {
  constructor(news) {
    this.id = news.id;
    this.title = news.title;
    this.description = news.description;
    this.price = news.price;
    this.url = news.url;
    this.date = news.date;
  }

  Render() {
    return `<style>
        .card {
          flex: 1 0 25%;
          width: 100%;
          padding: 20px;
          text-align: center;
        }
        .card-container {
          cursor: pointer;
        }
        .picture_${this.id} {
          width: 250px;
          height: 320px;
          border-radius: 25px;
          background-image: url(${this.url});
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
      <div class="custom-card">
        <div class="card">
          <div class="card-container">
            <div class="picture_${this.id}">
              <div class="price">${this.price}</div>
            </div>
            <div class="bottom">
              <p class="title">${this.title}</p>
              <p class="date">${this.date}</p>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

export default class ActiveTravels {
  constructor(recentNewsUrl) {
    this._activeTravelsList = [];
    this._activeTravelsURL = recentNewsUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  download(targetElement) {
    // console.log("this._activeTravelsURL", this._activeTravelsURL);
    fetch(`${this._activeTravelsURL}`)
      .then((result) => {
        result.json().then((jsob) => {
          // console.log("RESULT", jsob);
          const filteredArray = jsob.record.filter(
            (travelItem) => travelItem.status == "active"
          );

          if (filteredArray.length > 0) {
            gebi(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredArray
                .map((travelItem) => {
                  const _travelItem = new TravelItem(travelItem);
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

const gebi = (id) => document.getElementById(id);

const activeTravels = new ActiveTravels(
  "https://api.jsonbin.io/v3/b/6457bda18e4aa6225e9843e9"
);
activeTravels.download("card-container");
setTimeout(() => {
  document.querySelectorAll('.custom-card').forEach(function(customCard) {
    customCard.addEventListener('click', function() {
      window.location.href = 'src/html/travel-details.html';
    })
  })
}, 1000);
document.addEventListener('DOMContentLoaded', () => {
});