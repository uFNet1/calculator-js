const digitsDiv = document.querySelector(".digits");
const operatorsDiv = document.querySelector(".operators");
const clearBtn = document.querySelector("#clear-btn");
const removeBtn = document.querySelector("#remove-btn");

const leftSideOtp = document.querySelector("#leftSide");
const operatorOtp = document.querySelector("#operator");
const rightSideOtp = document.querySelector("#rightSide");

let leftSide = "";
let operator = "";
let rightSide = "";

let containsDecimalLeft = false;
let containsDecimalRight = false;

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
removeBtn.onclick = () => {
  remove();
};

function updateNumOutput(digit) {
  if (operator === "") {
    if (digit === "." && leftSide.includes(".")) return;

    leftSideOtp.style.display = "inline";
    leftSide += digit;
    leftSideOtp.textContent = leftSide;
  } else {
    if (digit === "." && rightSide.includes(".")) return;
    rightSideOtp.style.display = "inline";
    rightSide += digit;
    rightSideOtp.textContent = rightSide;
  }

  if (leftSideOtp.textContent.length > 1) {
    removeBtn.style.opacity = "100%";
  }
  if (operator !== "" && rightSideOtp.textContent.length <= 1) {
    removeBtn.style.opacity = "0";
  }
}
function updateOperatorOutput(op) {
  if (op === "=" && operator !== "") {
    showResult();
  } else if (op === "=" && operator === "") {
    return;
  } else if (op !== "=" && operator !== "") {
    showResult();
    operator = op;
    operatorOtp.textContent = operator;
    operatorOtp.style.display = "inline";
  } else if (op !== "=" && operator === "") {
    operatorOtp.style.display = "inline";
    operator = op;
    operatorOtp.textContent = operator;
  }
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

function showResult() {
  if (leftSide === "" && operator === "" && rightSide === "") return;
  let result = calculateResult();
  if (!result) {
    // clear();
    return;
  }
  //TODO ROUND Result
  if (!Number.isInteger(result)) {
    result = Number.parseFloat(result).toFixed(1);
  }

  clear();
  leftSide = String(result);
  leftSideOtp.textContent = result;
  return result;
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
}

function remove() {
  if (leftSide === "") {
    return;
  } else if (leftSide !== "" && operator === "" && rightSide === "") {
    if (leftSideOtp.textContent === "0" || leftSide.length <= 1) return;
    else {
      leftSide = removeLastElement(leftSide);
      leftSideOtp.textContent = leftSide;
    }
  } else if (rightSide !== "") {
    if (rightSideOtp.textContent === "0" || rightSide.length <= 1) return;
    else {
      rightSide = removeLastElement(rightSide);
      rightSideOtp.textContent = rightSide;
    }
  }
  if (
    leftSideOtp.textContent.length <= 1 ||
    (operator !== "" && rightSideOtp.textContent.length <= 1)
  ) {
    console.log("test");
    removeBtn.style.opacity = "0";
  }
}

function removeLastElement(string) {
  const numbers = string.split("");
  numbers.pop();
  return numbers.join("");
}

function keyboardListener() {
  // const supportedKeys = "0123456789.*--+=Backspace";
  const digitsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const operatorsArr = ["*", "-", "/", "+", "="];
  const functionalKeysArr = ["Backspace"];
  document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    if (digitsArr.includes(keyName)) {
      updateNumOutput(keyName);
    } else if (operatorsArr.includes(keyName)) {
      updateOperatorOutput(keyName);
    } else if (functionalKeysArr.includes(keyName)) {
      remove();
    }
  });
}
keyboardListener();
clear();
