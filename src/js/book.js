// Button animation

const radioButtons1 = document.querySelectorAll('input[name="travel-type"]');
let isAnySelected1 = false;
for (const radioButton of radioButtons1) {
  if (radioButton.checked) {
    isAnySelected1 = true;
    break;
  }
}

const radioButtons2 = document.querySelectorAll('input[name="travel-name"]');
let isAnySelected2 = false;
for (const radioButton of radioButtons2) {
  if (radioButton.checked) {
    isAnySelected2 = true;
    break;
  }
}

const inputs = [
  document.getElementById("last-name"),
  document.getElementById("first-name"),
  document.getElementById("phone-number"),
  document.getElementById("email"),
  document.getElementById("people-count"),
  document.getElementById("message")
];

const submitButton = document.getElementById("submit");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  let isAllFilled = true;
  for (const input of inputs) {
    if (input.value.trim() === "") {
      isAllFilled = false;
      break;
    }
  }

  if (isAllFilled && isAnySelected1 && isAnySelected2) {
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
