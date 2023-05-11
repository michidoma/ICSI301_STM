setTimeout(() => {
  const cardSliderContent = document.querySelectorAll(".card-slider-content");

  const cards1 = document.querySelectorAll(".travel-cat-1 .card");
  const cardCount1 = cards1.length;

  const cards2 = document.querySelectorAll(".travel-cat-2 .card");
  const cardCount2 = cards2.length;

  const cardSliderContainerWidth = document.querySelector(".card-slider-container").offsetWidth;

  const cardWidth = cards1[0].offsetWidth;

  const cardMarginRight = parseFloat(window.getComputedStyle(cards1[0]).marginRight);
  const cardMarginLeft = parseFloat(window.getComputedStyle(cards1[0]).marginLeft);
  const cardMargin = cardMarginLeft + cardMarginRight;

  const displayedCount = roundToNearest(cardSliderContainerWidth / (cardWidth + cardMargin));

  let offset = 0, offset2 = 0;
  const maxX1 = -((cardWidth + cardMargin) * (cardCount1 - displayedCount));
  const maxX2 = -((cardWidth + cardMargin) * (cardCount2 - displayedCount));

  document.querySelector(".prev-btn-1").addEventListener("click", () => {
    if (offset < 0) {
      offset += cardWidth + cardMargin;
      cardSliderContent[0].style.transform = `translateX(${offset}px)`;
    }
  });

  document.querySelector(".next-btn-1").addEventListener("click", () => {
    if (offset > maxX1) {
      offset -= cardWidth + cardMargin;
      cardSliderContent[0].style.transform = `translateX(${offset}px)`;
    }
  });

  document.querySelector(".prev-btn-2").addEventListener("click", () => {
    if (offset2 < 0) {
      offset2 += cardWidth + cardMargin;
      cardSliderContent[1].style.transform = `translateX(${offset2}px)`;
    }
  });

  document.querySelector(".next-btn-2").addEventListener("click", () => {
    if (offset2 > maxX2) {
      offset2 -= cardWidth + cardMargin;
      cardSliderContent[1].style.transform = `translateX(${offset2}px)`;
    }
  });

  const feedbackSliderContent = document.querySelectorAll(".c_track");
  const feedbacks = document.querySelectorAll(".carousel-feedback .c_slide");
  const feedbackCount = feedbacks.length;

  // const feedbackContainerWidth = document.querySelector(".c_track-container").offsetWidth;

  const feedbackWidth = feedbacks[0].offsetWidth;

  let offset3 = 0;
  const maxX3 = -(feedbackWidth * (feedbackCount - 1));

  document.querySelector(".prev-btn-3").addEventListener("click", () => {
    if (offset3 < 0) {
      offset3 += feedbackWidth;
      feedbackSliderContent[0].style.transform = `translateX(${offset3}px)`;
    }
  });

  document.querySelector(".next-btn-3").addEventListener("click", () => {
    if (offset3 > maxX3) {
      offset3 -= feedbackWidth;
      feedbackSliderContent[0].style.transform = `translateX(${offset3}px)`;
    }
  });

  document.querySelectorAll('.card').forEach(function(customCard) {
    customCard.addEventListener('click', function() {
      window.location.href = 'src/html/travel-details.html';
    })
  });

  // Side menu
  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.menu');

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

// Slideshow

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Autoplay animation
let slideInterval = setInterval(() => {
  plusSlides(1);
}, 3000);

// Pause autoplay animation when user hovers over the slideshow
let slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('mouseover', () => {
  clearInterval(slideInterval);
});

// Resume autoplay animation when user moves mouse away from the slideshow
slideshowContainer.addEventListener('mouseout', () => {
  slideInterval = setInterval(() => {
    plusSlides(1);
  }, 3000);
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-slide", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active-slide";
  // slideIndex++;
  // console.log('i, n, slideIndex :>> ', i, n, slideIndex);
  // setInterval(showSlides(slideIndex), 2000);
}

function roundToNearest(num) {
  if (num - Math.floor(num) >= 0.5) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
}