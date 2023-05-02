setTimeout(() => {
    // const cardSlider = document.querySelectorAll(".card-slider-container");
    // console.log(cardSlider);
    // const cardSliderWidth = cardSlider[0].offsetWidth;
    // const cards = document.querySelector("custom-card");
    // const cardWidth = cards.offsetWidth;
    // const cardMarginRight = parseInt(
    //   window.getComputedStyle(document.querySelector("custom-card")).marginRight
    // );
    // const cardMarginLeft = parseInt(
    //   window.getComputedStyle(document.querySelector("custom-card")).marginLeft
    // );
    // const cardCount = 6;
    // let offset = 0,
    //   offset2 = 0;
    // const maxX = -((cardWidth + cardMarginRight) * (cardCount - 4));
    // console.log("HMM ", cardWidth);
  
    // document.querySelector(".prev-btn").addEventListener("click", () => {
    //   if (offset !== 0) {
    //     offset += cardWidth + cardMarginRight;
    //     cardSlider[0].style.transform = `translateX(${offset}px)`;
    //   }
    // });
  
    // document.querySelector(".next-btn").addEventListener("click", () => {
    //   if (offset > maxX) {
    //     offset -= cardWidth + cardMarginRight;
    //     cardSlider[0].style.transform = `translateX(${offset}px)`;
    //   }
    // });

    const cardSliderContent = document.querySelectorAll(".card-slider-content");

    const cards = document.querySelectorAll(".travel-cat .card");
    const cardCount = cards.length;

    const cardSliderContainerWidth = document.querySelector(".card-slider-container").offsetWidth;

    const cardWidth = cards[0].offsetWidth;

    const cardMarginRight = parseFloat(window.getComputedStyle(cards[0]).marginRight);
    const cardMarginLeft = parseFloat(window.getComputedStyle(cards[0]).marginLeft);
    const cardMargin = cardMarginLeft + cardMarginRight;
  
    const displayedCount = roundToNearest(cardSliderContainerWidth / (cardWidth + cardMargin));

    let offset = 0;
    const maxX = -((cardWidth + cardMargin) * (cardCount - displayedCount));
  
    document.querySelector(".prev-btn").addEventListener("click", () => {
      if (offset < 0) {
        offset += cardWidth + cardMargin;
        cardSliderContent[0].style.transform = `translateX(${offset}px)`;
      }
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
      if (offset > maxX) {
        offset -= cardWidth + cardMargin;
        cardSliderContent[0].style.transform = `translateX(${offset}px)`;
      }
    });

    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.menu');
  
    console.log("ICON ", menu);
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    }

    document.querySelectorAll('custom-card').forEach(function(customCard) {
      customCard.addEventListener('click', function() {
        window.location.href = 'travel-details.html';
      })
    })
  }, 100);
  
  $(window).scroll(function () {
    if ($(window).scrollTop()) {
      $("nav").addClass("green");
    } else {
      $("nav").removeClass("green");
    }
  });


function roundToNearest(num) {
  if (num - Math.floor(num) >= 0.5) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
}