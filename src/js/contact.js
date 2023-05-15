setTimeout(() => {
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

// button animation
const submitButton = document.getElementById("submitButton");

const inputs = [
  document.getElementById("name"),
  document.getElementById("phone"),
  document.getElementById("email"),
  document.getElementById("message")
];

submitButton.addEventListener("click", (event) => {
  // Prevent the page from refreshing
  event.preventDefault();

  // Check if all the inputs are filled
  let isAllFilled = true;
  for (const input of inputs) {
    if (input.value.trim() === "") {
      isAllFilled = false;
      break;
    }
  }

  // If all the inputs are filled, show the animation
  if (isAllFilled) {
    // Disable the button to prevent multiple clicks
    submitButton.disabled = true;

    // Show the loading animation
    submitButton.innerHTML = "<div class='loader'></div>";

    // Simulate a 2-second loading animation
    setTimeout(() => {
      // Change the text to "Successfully sent"
      submitButton.innerHTML = "Илгээгдлээ";
      submitButton.style = "background: #186b4e; color: #ffffff; pointer-events: noene;"

      // Enable the button again
      // submitButton.disabled = false;

      // Save the data
      for (const i = 0; i < inputs.length; i++) {
        localStorage.setItem(inputs[i].name, inputs[i].value);
      }
    }, 3000);
  }
});


// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const formData = {
//     name: nameInput.value,
//     phone: phoneInput.value,
//     email: emailInput.value,
//     message: messageInput.value
//   };

//   // setTimeout(() => {
//   //   submitBtn.classList.remove('loading');
//   // }, 3000);

//   console.log(formData);
// });
