class Information {
    constructor(info) {
      this.id = info.id;
      this.mytitle = info.title;
      this.data = info.data;
      this.image = info.image;
    }
  
    Render() {
      return ` 
      <information-box
        mytitle="${this.mytitle}"
        data="${this.data}"
        logo="${this.image}"
      ></information-box>
      `;
      // <information-box
      //   title="${this.title}"
      //   data="${this.data}"
      //   logo="${this.image}"
      // ></information-box>
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
  