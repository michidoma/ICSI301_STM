setTimeout(() => {
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".menu");

  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("open");
  };
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
  document.getElementById("message"),
];

function retrieveData() {
  const retrievedData = JSON.parse(localStorage.getItem("contact"));
  const attributeNames = Object.keys(retrievedData);
  for (let i = 0; i < attributeNames.length; i++) {
    document.getElementById(`${attributeNames[i]}`).value =
      retrievedData[attributeNames[i]];
  }
}

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
      submitButton.style =
        "background: #186b4e; color: #ffffff; pointer-events: none;";

      contactData = {};
      for (let i = 0; i < inputs.length; i++) {
        contactData[inputs[i].name] = inputs[i].value;
      }
      localStorage.setItem("contact", JSON.stringify(contactData));
    }, 3000);
  } else {
    submitButton.innerHTML = "Талбаруудыг зөв, гүйцэт бөглөнө үү";
    setTimeout(() => {
      submitButton.innerHTML = "Илгээх";
    }, 3000);
  }
});
window.addEventListener("load", retrieveData);

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
