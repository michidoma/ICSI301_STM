// Button animation

const radioButtons1 = document.querySelectorAll('input[name="travel-type"]');
let isAnySelected1 = false;
let selectId1 = "";
let interData = [],
  localData = [],
  specialData = [];

let isAnySelected2 = false;
let selectId2 = "";

radioButtons1.forEach(function (radioButton) {
  radioButton.addEventListener("change", handleRadioChange);
});

function handleRadioChange(event) {
  if (event.target.checked) {
    selectId1 = event.target.id;
    isAnySelected1 = true;
  }

  changeSecondRadioGroup();

  const radioButtons2 = document.querySelectorAll('input[name="travel-name"]');
  radioButtons2.forEach(function (radioButton) {
    radioButton.addEventListener("change", handleRadioChange2);
  });

  function handleRadioChange2(event) {
    if (event.target.checked) {
      selectId2 = event.target.id;
      isAnySelected2 = true;
    }
  }
}

function initialSecondRadio() {
  const radioButton = document.querySelector(
    `input[name="travel-name"][id="${selectId2}"]`
  );
  radioButton.checked = true;
  isAnySelected2 = true;
  // const radioButton = radioButtons2.find(el => )
}

function changeSecondRadioGroup() {
  let secondGroupOptions;

  if (selectId1 == "local-travel") {
    secondGroupOptions = localData;
  }
  if (selectId1 == "inter-travel") {
    secondGroupOptions = interData;
  }
  if (selectId1 == "special-travel") {
    secondGroupOptions = specialData;
  }

  let secondGroup = document.getElementById("secondGroup");
  secondGroup.innerHTML = "";

  secondGroupOptions.forEach(function (option) {
    var label = document.createElement("label");
    var radio = document.createElement("input");
    var checkBoxContainer = document.createElement("div");
    checkBoxContainer.className = "check-box-container";
    radio.type = "radio";
    radio.name = "travel-name";
    radio.id = option.id;
    radio.value = option.value;
    label.className = "container";
    label.htmlFor = option.id;
    // label.appendChild(radio);
    label.appendChild(document.createTextNode(option.altText));
    checkBoxContainer.appendChild(radio);
    checkBoxContainer.appendChild(label);
    secondGroup.appendChild(checkBoxContainer);
  });
}

for (const radioButton of radioButtons1) {
  if (radioButton.checked) {
    isAnySelected1 = true;
    break;
  }
}

// for (const radioButton of radioButtons2) {
//   if (radioButton.checked) {
//     console.log("radioButton", radioButton);
//     isAnySelected2 = true;
//     break;
//   }
// }

const inputs = [
  document.getElementById("last-name"),
  document.getElementById("first-name"),
  document.getElementById("phone-number"),
  document.getElementById("email"),
  document.getElementById("people-count"),
  document.getElementById("message"),
];

const submitButton = document.getElementById("submit");

window.onbeforeunload = function() {
  for (let i = 0; i < inputs.length; i++) {
      bookingData[inputs[i].name] = inputs[i].value;
  }
  localStorage.setItem("booking", JSON.stringify(bookingData));
}

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
      submitButton.style =
        "background: #186b4e; color: #ffffff; pointer-events: none;";

      bookingData = {};
      // for (let i = 0; i < inputs.length; i++) {
      //   bookingData[inputs[i].name] = inputs[i].value;
      // }
      // localStorage.setItem("booking", JSON.stringify(bookingData));
    }, 3000);
  } else {
    submitButton.innerHTML = "Талбаруудыг зөв, гүйцэт бөглөнө үү";
    setTimeout(() => {
      submitButton.innerHTML = "Илгээх";
    }, 3000);
  }
});

function retrieveData() {
  const urlParams = new URLSearchParams(window.location.search);
  const travelId = urlParams.get("travelid");

  fetch("../../db.json")
    .then((result) => {
      result.json().then((jsonObject) => {
        const allData = jsonObject.travels;
        interData = allData.filter((travel) => travel.type == "international");
        localData = allData.filter((travel) => travel.type == "local");
        specialData = allData.filter((travel) => travel.type == "special");
        const targetData = allData.find((el) => el.id == travelId);
        if (targetData) {
          switch (targetData.type) {
            case "international":
              document.getElementById("inter-travel").checked = true;
              selectId1 = "inter-travel";
              break;
            case "local":
              document.getElementById("local-travel").checked = true;
              selectId1 = "local-travel";
              break;
            case "special":
              document.getElementById("special-travel").checked = true;
              selectId1 = "special-travel";
              break;
          }
          selectId2 = targetData.id;
          isAnySelected1 = true;
          changeSecondRadioGroup();
          initialSecondRadio();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });

  const retrievedData = JSON.parse(localStorage.getItem("booking"));

  if (retrievedData) {
    const attributeNames = Object.keys(retrievedData);
    for (let i = 0; i < attributeNames.length; i++) {
      document.getElementById(`${attributeNames[i]}`).value =
        retrievedData[attributeNames[i]];
    }
  }
}

window.addEventListener("load", retrieveData());
