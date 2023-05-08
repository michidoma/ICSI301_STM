class Comment {
  constructor(news) {
    this.id = news.id;
    this.author = news.author;
    this.comment = news.comment;
    this.date = news.date;
  }

  Render() {
    return `
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  
      <style>
        .feedback {
            width: 80%;
            word-wrap: break-word;
            font-size: 20px;
            font-weight: 550;
        }
        .author {
            width: 80%;
            text-align: end;
            font-size: 20px;
            font-weight: 550;
        }
        @media only screen and (max-width: 768px) {
            .author {        
                font-size: 16px;
            }
            .feedback {
                font-size: 16px;
            }
        }
        @media only screen and (max-width: 560px) {
            .author {        
                font-size: 14px;
            }
            .feedback {
                font-size: 14px;
            }
        }
      </style>
    <div class="feedback">
        <i>
            “ Олон хүн ардынхаа төлөө гэсэн сэтгэлтэй, зохион байгуулалт
            сайтай, сайхан аялуулдаг гэдгийг өөрийн биеэр мэдэрлээ.
            Сэтгэл ханамж 100% байлаа. Монгол аяллын хамт олонд ажлын
            өндөр амжилт, сайн сайхан бүхнийг хүсэн ерөөе. “
        </i>
        </div>
    <div class="author"><p><i>Б. Энгүүлэн</i></p></div>
      `;
  }
}

export default class CardComments {
  constructor(recentNewsUrl) {
    this._commentsList = [];
    this._commentsURL = recentNewsUrl;
    this._lastUpdated = Date.now();
    this._hasChanged = false;
  }

  download(targetElement) {
    // console.log("this._commentsURL", this._commentsURL);
    fetch(`${this._commentsURL}`)
      .then((result) => {
        result.json().then((jsob) => {
        //   console.log("RESULT", jsob);
          const filteredArray = jsob.record.filter(
            (travelItem) => travelItem.id == 1
          );

          if (filteredArray.length > 0) {
            gebi(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredArray
                .map((travelItem) => {
                  const _commentItem = new Comment(travelItem);
                  this._commentsList.push(_commentItem);
                  return _commentItem.Render();
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

const comment = new CardComments(
  "https://api.jsonbin.io/v3/b/645901f1b89b1e2299998b20"
);
comment.download("feedback-container");
// setTimeout(() => {
//   document.querySelectorAll("blog-card").forEach(function (customCard) {
//     customCard.addEventListener("click", function () {
//       window.location.href = "src/html/travel-details.html";
//     });
//   });
// }, 1000);
document.addEventListener("DOMContentLoaded", () => {});
