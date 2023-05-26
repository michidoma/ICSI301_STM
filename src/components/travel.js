function countdown(endDate) {
  let countdown = setInterval(function () {
    let now = new Date().getTime();
    let remainingTime = endDate - now;
    console.log("now", endDate);

    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    $("#days").text(days);
    $("#hours").text(hours);
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);

    if (remainingTime <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

class Travel extends HTMLElement {
  constructor() {
    super();

    // this.attachShadow({mode: "open"});

    /*this.render();*/

    const urlParams = new URLSearchParams(window.location.search);
    this.travelId = urlParams.get("travelid");
    console.log(this.travelId);

    // Fetch and render the travel details based on the travel ID

    this.fetchAndRenderTravelDetails();
  }

  fetchAndRenderTravelDetails() {
    // Make a request to fetch the travel details based on the travel ID
    fetch(`http://localhost:3000/travels/${this.travelId}`)
      .then((response) => response.json())
      .then((travel) => {
        // const travel = data.find(
        //   (travel) => travel.t_id == parseInt(this.travelId)
        // );
        console.log("TRAVEL", travel)
        const endDate = new Date(travel.startdate).getTime();
        console.log("travel", travel);
        console.log("endDate", endDate);
        countdown(endDate);
        // Render the travel details content
        this.render(travel);
      })
      .catch((error) => {
        console.error("Error fetching travel details:", error);
      });
  }

  render(travelDetails) {
    // Destructure the travel details object
    const {
      title,
      price,
      duration,
      totalpassengers,
      distance,
      description,
      destination,
      startdate,
      vehicle,
      included,
      notincluded,
      fromwhere,
    } = travelDetails;

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
                        <p>Үнэ</p>
                        <span>${price.toLocaleString()+'₮'}</span>
                    </div>
                </div>
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/clock.png" alt="Цаг">
                    </div>
                    <div>
                        <p>Хугацаа</p>
                        <span>${duration}</span>
                    </div>
                </div>
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/group-green.png" alt="Хүмүүс">
                    </div>
                    <div>
                        <p>Хүний тоо</p>
                        <span>${totalpassengers}</span>
                    </div>
                </div>
                <div class="brief-info">
                    <div>
                        <img class="icon-1" src="../../assets/icons/navigator.png" alt="Зай">
                    </div>
                    <div>
                        <p>Зай</p>
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
                        ${destination.map((item) => `${item}`).join(" - ")}
                        </td>
                    </tr>
                    <tr>
                        <th>Хаанаас хөдлөх</th>
                        <td>${fromwhere}</td>
                    </tr>
                    <tr>
                        <th>Хэзээ</th>
                        <td>${startdate}</td>
                    </tr>
                    <tr>
                        <th>Унаа</th>
                        <td>${vehicle}</td>
                    </tr>
                    <tr>
                        <th>Аяллын үнэд багтсан зүйлс</th>
                        <td>
                            <ul>
                                ${included
                                  .map(
                                    (item) => `
                                <li>
                                <i class="fa-regular fa-circle-check" style="color: #16c016;"></i>${item}
                                </li>  
                                `
                                  )
                                  .join("")}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Аяллын үнэд багтаагүй зүйлс</th>
                        <td>
                            <ul>
                                ${notincluded
                                  .map(
                                    (item) => `
                                <li>
                                <i class="fa-regular fa-circle-xmark" style="color: #F44336;"></i>${item}
                                </li>  
                                `
                                  )
                                  .join("")}
                            </ul>
                        </td>
                    </tr>
                </table>
            </section>


            <aside id="booking-section">
                <!-- Аяллын бүртгэл хаагдахад үлдсэн хугацаа -->
                <section class="timer">
                    <div class="days">
                        <h2 id="days"></h2>
                        <span>өдөр</span>
                    </div>
                    <div class="hours">
                        <h2 id="hours"></h2>
                        <span>цаг</span>
                    </div>
                    <div class="minutes">
                        <h2 id="minutes"></h2>
                        <span>мин</span>
                    </div>
                    <div class="seconds">
                        <h2 id="seconds"></h2>
                        <span>сек</span>
                    </div>
                    <!-- <clock-component days="6"></clock-component> -->
                </section>
                <!-- Аяллын захиалгын форм бөглөх хэсэг -->
                <section class="booking-form">
                    <div class="form-top"></div>
                    <h3>Энэ аяллыг захиалах</h3>
                    <form action="">
                        <input is="order-input" type="text" id="last_name" name="last_name" placeholder="Овог" required></input>
                        <input is="order-input" type="text" id="first_name" name="first_name" placeholder="Нэр" required></input>
                        <input is="order-input" type="email" id="email" name="email" placeholder="Имэйл" required></input>
                        <input is="order-input" type="email" id="email_verify" name="email_verify" placeholder="Имэйл баталгаажуулах" required></input>
                        <input is="order-input" type="tel" pattern="[0-9]*" id="phone" name="phone" placeholder="Утасны дугаар" required></input>
                        <input is="order-input" type="number" id="num_adults" name="num_adults" placeholder="Том хүний тоо" min="0" required></order-input>
                        <input is="order-input" type="number" id="num_children" name="num_children" placeholder="Хүүхдийн тоо" min="0" required></order-input>
                        <custom-total price=${price}></custom-total>
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
