var numberButtons = document.getElementsByClassName("number");
var operatorButtons = document.getElementsByClassName("operator");
var equalsButton = document.getElementById("button-equals");
var clearButton = document.getElementById("button-clear");
var backspaceButton = document.getElementById("button-backspace");
var screen = document.getElementById("screen");

var firstNums = 0;
var secondNums = 0;
var currentNums = [];
var operator = "";
var decimalPressed = false;

function convertToNumber() {
  var numStr = currentNums.join("");
  return decimalPressed ? parseFloat(numStr) : parseInt(numStr);
}

function calculateResult() {
  switch (operator) {
    case "+":
      return firstNums + secondNums;
    case "−":
      return firstNums - secondNums;
    case "×":
    case "*":
      return firstNums * secondNums;
    case "÷":
    case "/":
      return firstNums / secondNums;
    default:
      return 0;
  }
}

function updateScreen() {
  var screenContent = "";
  
  screenContent += firstNums || "";
  screenContent += operator ? " " + operator + " " : "";
  screenContent += secondNums || "";
  screenContent += currentNums.length !== 0 ? currentNums.join("") : "";
  
  screen.textContent = screenContent;
}


Array.from(numberButtons).forEach(function(button) {
  button.addEventListener("click", function() {
    var num = this.textContent;
    if (!isNaN(parseFloat(num))) {
      currentNums.push(parseFloat(num));
      updateScreen();
    } else if (num === "." && !decimalPressed) {
      currentNums.push(".");
      decimalPressed = true;
      updateScreen();
    }
  });
});


document.getElementById("button-point").addEventListener("click", function() {
  if (!decimalPressed) {
    currentNums.push(".");
    decimalPressed = true;
    updateScreen();
  }
});

Array.from(operatorButtons).forEach(function(button) {
  button.addEventListener("click", function() {
    if (currentNums.length > 0) {
      operator = this.textContent.trim();
      firstNums = convertToNumber();
      currentNums = [];
      decimalPressed = false;
      updateScreen();
    }
  });
});


clearButton.addEventListener("click", function() {
  firstNums = 0;
  secondNums = 0;
  currentNums = [];
  operator = "";
  decimalPressed = false;
  updateScreen();
});

backspaceButton.addEventListener("click", function() {
  currentNums.pop();
  updateScreen();
});

equalsButton.addEventListener("click", function() {
  secondNums = convertToNumber();
  var result = calculateResult();
  firstNums = 0;
  secondNums = 0;
  currentNums = [];
  operator = "";
  decimalPressed = false;
  screen.textContent = result;
});

document.addEventListener("keydown", function(event) {
  var key = event.key;
  switch (key) {
    case "Enter":
      if (currentNums.length > 0) {
        secondNums = convertToNumber();
        var result = calculateResult();
        firstNums = 0;
        secondNums = 0;
        currentNums = [];
        operator = "";
        decimalPressed = false;
        screen.textContent = result;
      }
      break;
    case "Backspace":
      currentNums.pop();
      updateScreen();
      break;
    case "Delete":
      firstNums = 0;
      secondNums = 0;
      currentNums = [];
      operator = "";
      decimalPressed = false;
      updateScreen();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      operator = key;
      firstNums = convertToNumber();
      currentNums = [];
      decimalPressed = false;
      updateScreen();
      break;
    default:
      if (!isNaN(parseFloat(key))) {
        currentNums.push(parseFloat(key));
        updateScreen();
      } else if (key === ".") {
        if (!decimalPressed) {
          currentNums.push(".");
          decimalPressed = true;
          updateScreen();
        }
      }
      break;
  }
});


updateScreen();
