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

  document.querySelector(".prev-btn-2").addEventListener("click", () => {
    if (offset2 !== 0) {
      offset2 += cardWidth + cardMarginRight;
      cardSlider[1].style.transform = `translateX(${offset2}px)`;
    }
  });

  document.querySelector(".next-btn-2").addEventListener("click", () => {
    if (offset2 > maxX) {
      offset2 -= cardWidth + cardMarginRight;
      cardSlider[1].style.transform = `translateX(${offset2}px)`;
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
      window.location.href = 'src/html/travel-details.html';
    })
  })

  document.querySelectorAll('.custom-card').forEach(function(customCard) {
    console.log("IRSEN")
    customCard.addEventListener('click', function() {
      window.location.href = 'src/html/travel-details.html';
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

let loader = document.getElementById("loader");

window.addEventListener("load", function() {
  loader.style.display = "none"
});