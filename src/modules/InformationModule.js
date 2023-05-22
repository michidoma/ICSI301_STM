class Information {
    constructor(info) {
      this.id = info.id;
      this.title = info.title;
      this.data = info.data;
      this.image = info.image;
    }
  
    Render() {
      return ` 
      <div class="information-box">
        <section class="box">
          <img src="${this.image}" alt="statistics"/>
          <div class="info">
            <p>${this.title}</p>
            <h1>${this.data}</h1>
          </div>
        </section>
      </div>
      `;
    }
}
  
export default class LastestInfo {
    constructor(jsonUrl) {
      this._recentInfoList = [];
      this._jsonUrl = jsonUrl;
      this._lastUpdated = Date.now();
      this._hasChanged = false;
    }
    fetchAndRenderInfo(targetElement) {
      fetch(this._jsonUrl)
        .then((result) => {
  console.log("aldaa");
          result.json().then((jsonObject) => {
            const filteredArray = jsonObject.information.filter(
              (info) => info.id >= 1
            );
  
            if (filteredArray.length > 0) {
              document.getElementById(targetElement).insertAdjacentHTML(
                "afterbegin",
                filteredArray
                  .map((infoItem) => {
                    const _infoItem = new Information(infoItem);
                    this._recentInfoList.push(_infoItem);
                    return _infoItem.Render();
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
  