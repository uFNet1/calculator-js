const digitsDiv = document.querySelector(".digits");
const operatorsDiv = document.querySelector(".operators");
const clearBtn = document.querySelector(".clear-btn");

const leftSideOtp = document.querySelector("#leftSide");
const operatorOtp = document.querySelector("#operator");
const rightSideOtp = document.querySelector("#rightSide");

let leftSide = "";
let operator = "";
let rightSide = "";

let containsDecimalLeft = false;
let containsDecimalRight = false;
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
    if (digit === "." && containsDecimalLeft) {
      return;
    }
    if (digit === "." && !containsDecimalLeft) {
      if (leftSide === "") return;
      containsDecimalLeft = true;
    }

    leftSideOtp.style.display = "inline";
    leftSide += digit;
    leftSideOtp.textContent = leftSide;
  } else {
    if (digit === "." && containsDecimalRight) {
      return;
    }
    if (digit === "." && !containsDecimalRight) {
      if (leftSide === "") return;
      containsDecimalRight = true;
    }

    rightSideOtp.style.display = "inline";
    rightSide += digit;
    rightSideOtp.textContent = rightSide;
  }
}
function updateOperatorOutput(op) {
  if (showingResult) {
    showingResult = false;
    leftSide = rightSideOtp.textContent;
    leftSideOtp.textContent = leftSide;
    leftSideOtp.style.display = "inline";
    rightSide = "";
    rightSideOtp.textContent = "";
    rightSideOtp.style.display = "none";
    // clear();
  }
  if (op === "=") {
    if (leftSide === "" && operator === "" && rightSide === "") return;
    let result = calculateResult();
    if (!result) {
      clear();
      return;
    }
    //TODO ROUND Result
    if (!Number.isInteger(result)) {
      result = Number.parseFloat(result).toFixed(1);
    }
    showingResult = true;
    leftSideOtp.style.display = "none";
    operatorOtp.style.display = "none";
    rightSideOtp.textContent = result;
    return;
  }
  if (leftSide === "") {
    leftSide = "0";
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
  else if (operator === "/") {
    if (leftSide === "0" && rightSide === "0") {
      alert(`Cannot divide 0 by 0`);
      return false;
    } else return Number(leftSide) / Number(rightSide);
  }
}

function clear() {
  leftSide = "";
  operator = "";
  rightSide = "";

  leftSideOtp.style.display = "inline";
  operatorOtp.style.display = "none";
  rightSideOtp.style.display = "none";

  leftSideOtp.textContent = "0";
  operatorOtp.textContent = "0";
  rightSideOtp.textContent = "0";

  containsDecimalLeft = false;
  containsDecimalRight = false;
  showingResult = false;
}

clear();
