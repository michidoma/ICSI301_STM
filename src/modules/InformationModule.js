class Information {
    constructor(info) {
      this.id = info.id;
      this.mytitle = info.title;
      this.data = info.data;
      this.image = info.image;
    }
  
    Render() {
            return ` 
      <information-box>
        <img slot="image" src="${this.image}" alt="statistics" style="width: 50px; height: 50px;"/>
        <p slot="title">${this.mytitle}</p>
        <h1 slot="data">${this.data}</h1>
     </information-box>
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
  