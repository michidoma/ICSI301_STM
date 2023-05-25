class Travel extends HTMLElement {

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
        const {title, price, duration, totalPassengers, distance, description, destination, startDate, vehicle, included, notIncluded, fromWhere} = travelDetails;
    
        // Render the travel details content
        this.innerHTML = `
        <!-- Page banner -->
        <section class="banner">
            <img src="../../assets/webp/header-tengeriin-haalga.webp" alt="Тэнгэрийн хаалга">
            <h1 id="travel-title">${title}</h1>
        </section>
        <!-- Аяллын тухай товч мэдээлэл хүргэх хэсэг -->
        <section class="pre-content">
            <section class="top-brief">
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/coin.png" alt="Мөнгөн тэмдэгт">
                    </div>
                    <div>
                        <p><b>Үнэ</b></p>
                        <span>${price}</span>
                    </div>
                </div>
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/clock.png" alt="Цаг">
                    </div>
                    <div>
                        <p><b>Хугацаа</b></p>
                        <span>${duration}</span>
                    </div>
                </div>
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/group-green.png" alt="Хүмүүс">
                    </div>
                    <div>
                        <p><b>Хүний тоо</b></p>
                        <span>${totalPassengers}</span>
                    </div>
                </div>
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/navigator.png" alt="Зай">
                    </div>
                    <div>
                        <p><b>Зай</b></p>
                        <span>${distance}</span>
                    </div>
                </div>
            </section>
            <!-- Tab navigation -->
            <ul class="tabs-nav">
                <li id="selected-tab">
                    <a href="#"><b>Дэлгэрэнгүй</b></a>
                </li>
                <li>
                    <a href="#"><b>Төлөвлөгөө</b></a>
                </li>
                <li>
                    <a href="#"><b>Байршил</b></a>
                </li>
                <li>
                    <a href="#"><b>Зургийн цомог</b></a>
                </li>
                <li>
                    <a href="#"><b>Нэмэлт мэдээлэл</b></a>
                </li>
            </ul>
        </section>
        <section class="main-content">
            <!-- Аяллын тухай дэлгэрэнгүй мэдээллүүд -->
            <section class="content">
                <h1>Танилцуулга</h1>
                <p>${description}</p>
                <table style="width: 100%;">
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


            <aside id="booking-section">
                <!-- Аяллын бүртгэл хаагдахад үлдсэн хугацаа -->
                <section class="timer">
                    <div class="days">
                        <h2>6</h2>
                        <span>өдөр</span>
                    </div>
                    <div class="hours">
                        <h2>10</h2>
                        <span>цаг</span>
                    </div>
                    <div class="minutes">
                        <h2>23</h2>
                        <span>мин</span>
                    </div>
                    <div class="seconds">
                        <h2>17</h2>
                        <span>сек</span>
                    </div>
                    <!-- <clock-component days="6"></clock-component> -->
                </section>
                <!-- Аяллын захиалгын форм бөглөх хэсэг -->
                <section class="booking-form">
                    <div class="form-top"></div>
                    <h3>Энэ аяллыг захиалах</h3>
                    <form action="">
                        <input type="text" id="name" name="name" placeholder="Нэр" required>
                        <input type="email" id="email" name="email" placeholder="Имэйл" required>
                        <input type="email" id="email_verify" name="email_verify" placeholder="Имэйл баталгаажуулах" required>
                        <input type="tel" id="phone" name="phone" placeholder="Утасны дугаар" required>
                        <input type="number" id="num_tickets" name="num_tickets" placeholder="Билетийн тоо" required>
                        <span>Нийт дүн: 2,400,000₮</span>
                        <textarea id="message" name="message" rows="5" cols="50" placeholder="Мессеж"></textarea>
                        <input type="submit" value="Илгээх">
                    </form>
                </section>
            </aside>
        </section>
        `;
    }
}

customElements.define("travel-details", Travel);