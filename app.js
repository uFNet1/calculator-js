const digitsDiv = document.querySelector(".digits");
const operatorsDiv = document.querySelector(".operators");
const clearBtn = document.querySelector(".clear-btn");

const leftSideOtp = document.querySelector("#leftSide");
const operatorOtp = document.querySelector("#operator");
const rightSideOtp = document.querySelector("#rightSide");

let leftSide = "";
let operator = "";
let rightSide = "";

let showingResult = false;

digitsDiv.onclick = (event) => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;
  const digit = target.textContent;
  updateNumOutput(digit);
};
operatorsDiv.onclick = (event) => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;
  const op = target.textContent;
  updateOperatorOutput(op);
};
clearBtn.onclick = (event) => {
  clear();
};

function updateNumOutput(digit) {
  if (showingResult) {
    showingResult = false;
    clear();
  }
  if (operator === "") {
    leftSideOtp.style.display = "inline";
    leftSide += digit;
    leftSideOtp.textContent = leftSide;
  } else {
    rightSide += digit;
    rightSideOtp.textContent = rightSide;
  }
}
function updateOperatorOutput(op) {
  if (showingResult) {
    showingResult = false;
    clear();
  }
  if (op === "=") {
    if (leftSide === "" && operator === "" && rightSide === "") return;
    const result = calculateResult();
    showingResult = true;
    leftSideOtp.style.display = "none";
    operatorOtp.style.display = "none";
    rightSideOtp.textContent = result;
    return;
  }
  if (leftSide === "") {
    leftSide = 0;
    leftSideOtp.textContent = 0;
    leftSideOtp.style.display = "inline";
  }
  operatorOtp.style.display = "inline";
  operator = op;
  operatorOtp.textContent = operator;
}
function calculateResult() {
  if (operator === "+") return Number(leftSide) + Number(rightSide);
  else if (operator === "-") return Number(leftSide) - Number(rightSide);
  else if (operator === "*") return Number(leftSide) * Number(rightSide);
  else if (operator === "/") return Number(leftSide) / Number(rightSide);
}

function clear() {
  leftSide = "";
  operator = "";
  rightSide = "";

  leftSideOtp.style.display = "none";
  operatorOtp.style.display = "none";
  rightSideOtp.style.display = "inline";

  leftSideOtp.textContent = "0";
  operatorOtp.textContent = "0";
  rightSideOtp.textContent = "0";
}

clear();
