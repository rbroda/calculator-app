let firstNumber = null;
let secondNumber = null;
let operator = null;
let result = null;

let lastSecondNumber = null;

let isOperatorBtnPressed = false;
let isEqualsBtnPressed = false;

let display = document.querySelector(".display");

const backspaceBtn = document.querySelector("#backspaceBtn");
backspaceBtn.addEventListener("click", function (event) {
  display.textContent = display.textContent.slice(0, -1);
});

const numberBtn = document.querySelectorAll(".numberBtn");
numberBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (isOperatorBtnPressed) {
      display.textContent = "";
      isOperatorBtnPressed = false;
    }
    display.textContent += this.textContent;

    // Reset the program if the equals button has been pressed and start a new calculation
    if (isEqualsBtnPressed) {
      reset();
      display.textContent = this.textContent;
      isEqualsBtnPressed = false;
    }
  });
});

const operatorBtn = document.querySelectorAll(".operatorBtn");
operatorBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    // If consecutive operator buttons are pressed, do not copy first number to second number
    if (isOperatorBtnPressed) {
      operator = this.textContent;
      console.log("The operator is: " + operator);
      return;
    }

    // Use the result of the previous operation as the first number
    if (isEqualsBtnPressed) {
      firstNumber = display.textContent;
      console.log("The first operand is: " + firstNumber);
      operator = this.textContent;
      console.log("The operator is: " + operator);
      isOperatorBtnPressed = true;
      isEqualsBtnPressed = false;
      lastSecondNumber = null;
      return;
    }

    // If firstNumber and operator already have values, perform the operation first
    if (
      firstNumber !== null &&
      operator !== null &&
      display.textContent !== ""
    ) {
      secondNumber = display.textContent;
      console.log("The second operand is: " + secondNumber);
      result = operate(firstNumber, secondNumber, operator);
      display.textContent = roundToTwoDecimals(result);
      firstNumber = display.textContent;
      console.log("Result is now firstNumber: " + firstNumber);
    } else {
      firstNumber = display.textContent;
      console.log("The first operand is: " + firstNumber);
    }

    operator = this.textContent;
    isOperatorBtnPressed = true;
    console.log("The operator is: " + operator);
    // reset when picking a new operator
    lastSecondNumber = null;
  });
});

const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", () => {
  // Use the number entered by the user as secondNumber and also capture it on a separate variable.
  // On subsequent equalsButton presses, reuse the last captured second operand.
  if (lastSecondNumber === null || isOperatorBtnPressed) {
    secondNumber = display.textContent;
    lastSecondNumber = secondNumber;
  } else {
    secondNumber = lastSecondNumber;
  }
  console.log("The second operand is: " + secondNumber);
  result = operate(firstNumber, secondNumber, operator);
  display.textContent = roundToTwoDecimals(result);
  // Use the result of the operation as the next firstNumber
  firstNumber = display.textContent;
  isOperatorBtnPressed = false;
  isEqualsBtnPressed = true;
});

const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", reset);

function roundToTwoDecimals(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

// Define the operations
const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const exp = (a, b) => a ** b;

// Determine which operation to perform based on the operator used by the user
function operate(firstNumber, secondNumber, operator) {
  a = Number(firstNumber);
  b = Number(secondNumber);

  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return substract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else if (operator === "^") {
    return exp(a, b);
  }
}

function reset() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  lastSecondNumber = null;
  isOperatorBtnPressed = false;
  isEqualsBtnPressed = false;
  display.textContent = "";
}
