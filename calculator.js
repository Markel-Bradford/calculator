const container = document.getElementById("container");
const screen = document.getElementById("screen");
let currentInput = " ";
let firstNum = null;
let secondNum = null;
let currentOperater = null;
let resetScreen = false;

window.onload = function () {
  const valuesArray = [
    "A/C", "", "", "/",
    "1", "2", "3", "*",
    "4", "5", "6", "-",
    "7", "8", "9", "+",
    "Bksp", "0", ".", "=",
  ];
  function makeKeys(numberOfRows, numberOfColumns) {
    for (let i = 0; i < numberOfRows; i++) {
      let row = document.createElement("button");
      row.className = "row";
      container.appendChild(row);

      for (let c = 0; c < numberOfColumns; c++) {
        let col = document.createElement("button");
        col.className = "col";
        const value = valuesArray[i * numberOfColumns + c]; // Assign value from the array
        col.innerText = value;
        col.id = `key-${value}`; // Assign an ID
        row.appendChild(col);
        row.appendChild(col);

        // Add onclick event listener
        col.addEventListener("click", () => handleInput(value));
      }
    }
  }

  makeKeys(5, 4);

  // Handle button click or key press
  function handleInput(value) {
    if (value === "A/C") {
      // Reset everything
      currentInput = "";
      firstNum = null;
      secondNum = null;
      currentOperator = null;
    } else if (value === "Bksp") {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1); // Backspace functionality
      }
    } else if (value === "=") {
      if (currentOperator !== null && firstNum !== null) {
        secondNum = parseFloat(currentInput);
        currentInput = roundRes(
          operate(firstNum, secondNum, currentOperator)
        ).toString();
        firstNum = null;
        currentOperator = null;
      }
    } else if (value === ".") {
      if (!currentInput.includes(".")) {
        currentInput += value;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (firstNum === null) {
        firstNum = parseFloat(currentInput); // Set firstNum if it is null
      } else if (currentOperator !== null) {
        secondNum = parseFloat(currentInput);
        firstNum = roundRes(operate(firstNum, secondNum, currentOperator));
        currentInput = firstNum.toString();
      }
      currentOperator = value; // Set the operator
      resetScreen = true;
    } else {
      if (resetScreen) {
        currentInput = value;
        resetScreen = false;
      } else {
        currentInput += value;
      }
    }
    updateDisplay();
  }

  function updateDisplay() {
    // Display the values in the screen div
    screen.innerText = currentInput;
  }

  // Map the keys to the expected value for keydown event
  const keyMap = {
    Delete: "A/C",
    "/": "/",
    1: "1",
    2: "2",
    3: "3",
    "*": "*",
    4: "4",
    5: "5",
    6: "6",
    "-": "-",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    0: "0",
    ".": ".",
    Enter: "=",
    Backspace: "Bksp",
  };

  // Add keydown event listener to highlight keys
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (keyMap[key]) {
      handleInput(keyMap[key]);
      highlightKey(keyMap[key]);
    }
  });

  // Add keyup event listener to remove highlight
  window.addEventListener("keyup", (event) => {
    const key = event.key;
    if (keyMap[key]) {
      removeHighlight(keyMap[key]);
    }
  });

  // Highlight the key
  function highlightKey(key) {
    const button = document.getElementById(`key-${key}`);
    if (button) {
      button.classList.add("highlight");
    }
  }

  // Remove the highlight
  function removeHighlight(key) {
    const button = document.getElementById(`key-${key}`);
    if (button) {
      button.classList.remove("highlight");
    }
  }

  // Create math functions
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
    return num1 / num2;
  }

  // Create function that performs the desired operation based on the operator case
  function operate(num1, num2, operator) {
    switch (operator) {
      case "+":
        return add(num1, num2);
      case "-":
        return subtract(num1, num2);
      case "*":
        return multiply(num1, num2);
      case "/":
        if (num2 !== 0) {
        return divide(num1, num2);
    } else {
        return "Error! That's a no-go pal!"
    }
      default:
        return null  
    }
  }

  // Create a function to round the result to two decimal places using Math.round
  function roundRes(num) {
    return Math.round(num * 100) / 100;
  }
};
