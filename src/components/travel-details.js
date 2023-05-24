class TravelInfo extends HTMLElement {

    constructor() {
        super();

        // this.attachShadow({mode: "open"});

        /*this.render();*/

        const urlParams = new URLSearchParams(window.location.search);
        this.travelId = urlParams.get('travelid');
        console.log(this.travelId);

        // Fetch and render the travel details based on the travel ID
        
        this.fetchAndRenderTravelDetails();
    }

      fetchAndRenderTravelDetails() {
        // Make a request to fetch the travel details based on the travel ID
        fetch(`../../db.json`)
          .then(response => response.json())
          .then(data => {
            const travel = data.travels.find(travel => travel.id === parseInt(this.travelId));
            console.log("travel");
            // Render the travel details content
            this.render(travel);
          })
          .catch(error => {
            console.error('Error fetching travel details:', error);
          });
      }

      render(travelDetails) {
        // Destructure the travel details object
        const {description, destination, startDate, vehicle, included, notIncluded, fromWhere} = travelDetails;
    
        // Render the travel details content
        this.innerHTML = `
        <section class="content">
                <h1>Танилцуулга</h1>
                <p>${description}</p>
                <table>
                    <tr class="first-row">
                        <th>Чиглэл</th>
                        <td>
                        ${destination.map(item => `${item}`).join(" - ")}
                        </td>
                    </tr>
                    <tr>
                        <th>Хаанаас хөдлөх</th>
                        <td>${fromWhere}</td>
                    </tr>
                    <tr>
                        <th>Хэзээ</th>
                        <td>${startDate}</td>
                    </tr>
                    <tr>
                        <th>Унаа</th>
                        <td>${vehicle}</td>
                    </tr>
                    <tr>
                        <th>Аяллын үнэд багтсан зүйлс</th>
                        <td>
                            <ul>
                                ${included.map(item => `
                                <li>
                                <i class="fa-regular fa-circle-check" style="color: #16c016;"></i>${item}
                                </li>  
                                `).join("")}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Аяллын үнэд багтаагүй зүйлс</th>
                        <td>
                            <ul>
                                ${notIncluded.map(item => `
                                <li>
                                <i class="fa-regular fa-circle-xmark" style="color: #F44336;"></i>${item}
                                </li>  
                                `).join("")}
                            </ul>
                        </td>
                    </tr>
                </table>
            </section>
        `;
    }
}

customElements.define("travel-info", TravelInfo);