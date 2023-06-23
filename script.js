const numberButtons = Array.from(document.getElementsByClassName("number"));
const operatorButtons = Array.from(document.getElementsByClassName("operator"));
const equalsButton = document.getElementById("button-equals");
const clearButton = document.getElementById("button-clear");
const backspaceButton = document.getElementById("button-backspace");
const screen = document.getElementById("screen");
const dot = document.getElementById("button-point");

let firstNum = '';
let secondNum = '';
let operator = '';
let hasDecimal = false; // Flag to track if decimal point has been used

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error("Oops! You divided by zero!");
  }
  return num1 / num2;
}

function operate(op, num1, num2) {
  switch (op) {
    case '+':
      return add(num1, num2);
    case '-':
    case '−':
      return subtract(num1, num2);
    case '*':
    case '×':
      return multiply(num1, num2);
    case '/':
    case '÷':
      return divide(num1, num2);
    default:
      return 'Error in operate function';
  }
}

function handleNumberButtonClick(clickedValue) {
  if (operator === '') {
    if (clickedValue === '.' && firstNum.includes('.')) {
      return; // Ignore additional decimal points in firstNum
    }
    firstNum += clickedValue;
    screen.textContent = firstNum;
  } else {
    if (clickedValue === '.' && secondNum.includes('.')) {
      return; // Ignore additional decimal points in secondNum
    }
    secondNum += clickedValue;
    screen.textContent = firstNum + ' ' + operator + ' ' + secondNum;
  }
}

function handleOperatorButtonClick(clickedValue) {
  if (operator === '') {
    operator = clickedValue;
    screen.textContent = firstNum + ' ' + operator;
  } else {
    if (secondNum !== '') {
      const result = operate(operator.trim(), parseFloat(firstNum), parseFloat(secondNum));
      if (result === 'Error') {
        screen.textContent = 'Error';
      } else {
        screen.textContent = result;
      }
      firstNum = result.toString();
      secondNum = '';
    }
    operator = clickedValue;
    screen.textContent = firstNum + ' ' + operator;
  }
}

function handleEqualsButtonClick() {
  if (firstNum !== '' && secondNum !== '') {
    try {
      const result = operate(operator.trim(), parseFloat(firstNum), parseFloat(secondNum));
      if (isNaN(result)) {
        screen.textContent = "Oops! Something went wrong.";
      } else {
        screen.textContent = result;
      }
      firstNum = result.toString();
      secondNum = '';
      operator = '';
      hasDecimal = false; // Resetting the flag
    } catch (error) {
      screen.textContent = error.message;
      firstNum = '';
      secondNum = '';
      operator = '';
      hasDecimal = false; // Resetting the flag
    }
  }
}

function handleClearButtonClick() {
  firstNum = '';
  secondNum = '';
  operator = '';
  screen.textContent = '';
}

function handleBackspaceButtonClick() {
  if (secondNum !== '') {
    secondNum = secondNum.slice(0, -1);
    screen.textContent = firstNum + ' ' + operator + ' ' + secondNum;
  } else if (operator !== '') {
    operator = '';
    screen.textContent = firstNum;
  } else {
    firstNum = firstNum.slice(0, -1);
    screen.textContent = firstNum;
  }
}

function handleDotButtonClick() {
  if (operator === '') {
    if (!firstNum.includes('.')) {
      firstNum += '.';
      screen.textContent = firstNum;
      hasDecimal = true;
    }
  } else {
    if (!secondNum.includes('.')) {
      secondNum += '.';
      screen.textContent = firstNum + ' ' + operator + ' ' + secondNum;
      hasDecimal = true;
    }
  }
}

function handleKeyboardInput(event) {
  const { key } = event;

  if (key >= '0' && key <= '9') {
    handleNumberButtonClick(key);
  } else if (key === '.') {
    handleDotButtonClick();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    handleOperatorButtonClick(key);
  } else if (key === 'Enter' || key === '=') {
    handleEqualsButtonClick();
  } else if (key === 'Backspace') {
    handleBackspaceButtonClick();
  } else if (key === 'Delete') {
    handleClearButtonClick();
  }
}

[...numberButtons].forEach(button => {
  button.addEventListener("click", function () {
    const clickedValue = this.textContent;
    handleNumberButtonClick(clickedValue);
  });
});

[...operatorButtons].forEach(button => {
  button.addEventListener("click", function () {
    const clickedValue = this.textContent;
    handleOperatorButtonClick(clickedValue);
  });
});

equalsButton.addEventListener("click", handleEqualsButtonClick);
clearButton.addEventListener("click", handleClearButtonClick);
backspaceButton.addEventListener("click", handleBackspaceButtonClick);
dot.addEventListener("click", handleDotButtonClick);

document.addEventListener("keydown", handleKeyboardInput);
