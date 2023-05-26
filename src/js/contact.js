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
  event.preventDefault();

  let isAllFilled = true;
  for (const input of inputs) {
    if (input.value.trim() === "") {
      isAllFilled = false;
      break;
    }
  }

  if (isAllFilled) {
    submitButton.disabled = true;
    submitButton.innerHTML = "<div class='loader'></div>";

    setTimeout(() => {
      submitButton.innerHTML = "Илгээгдлээ";
      submitButton.style = "background: #186b4e; color: #ffffff; pointer-events: none;";

      for (const i = 0; i < inputs.length; i++) {
        localStorage.setItem(inputs[i].name, inputs[i].value);
      }
    }, 3000);
  } else {
    submitButton.innerHTML = "Талбаруудыг зөв, гүйцэт бөглөнө үү";
    setTimeout(() => {
      submitButton.innerHTML = "Илгээх";
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
