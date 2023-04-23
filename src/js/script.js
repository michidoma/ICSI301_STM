setTimeout(() => {
    const cardSlider = document.querySelectorAll(".card-slider-container");
    console.log(cardSlider);
    const cardSliderWidth = cardSlider[0].offsetWidth;
    const cards = document.querySelector("custom-card");
    const cardWidth = cards.offsetWidth;
    const cardMarginRight = parseInt(
      window.getComputedStyle(document.querySelector("custom-card")).marginRight
    );
    const cardMarginLeft = parseInt(
      window.getComputedStyle(document.querySelector("custom-card")).marginLeft
    );
    const cardCount = 6;
    let offset = 0,
      offset2 = 0;
    const maxX = -((cardWidth + cardMarginRight) * (cardCount - 4));
    console.log("HMM ", cardWidth);
  
    document.querySelector(".prev-btn").addEventListener("click", () => {
      if (offset !== 0) {
        offset += cardWidth + cardMarginRight;
        cardSlider[0].style.transform = `translateX(${offset}px)`;
      }
    });
  
    document.querySelector(".next-btn").addEventListener("click", () => {
      if (offset > maxX) {
        offset -= cardWidth + cardMarginRight;
        cardSlider[0].style.transform = `translateX(${offset}px)`;
      }
    });
  
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.menu');
  
    console.log("ICON ", menu);
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    }
  }, 100);
  
  $(window).scroll(function () {
    if ($(window).scrollTop()) {
      $("nav").addClass("green");
    } else {
      $("nav").removeClass("green");
    }
  });