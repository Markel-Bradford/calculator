const container = document.getElementById("container");
const screen = document.getElementById("screen");
let currentInput = " ";
let firstNum = null;
let secondNum = null;
let currentOperater = null;
let resetScreen = false;

window.onload = function () {
  const valuesArray = [
    "Clear",
    "(",
    ")",
    "/",
    "1",
    "2",
    "3",
    "*",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "+",
    "",
    "0",
    ".",
    "=",
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
    // Create condition where all stored values will be cleared when delete is pressed or clear is clicked
    if (value === "Clear") {
      currentInput = "";
      firstNum = null
      secondNum = null
      currentOperater = null
    } else if (value === "=") { // create condition to execute operate function when enter is pressed or = is clicked
        if (currentOperater !== null && firstNum !== null) { // Set condition if there is an opertor and firstNum value
            secondNum = parseFloat(currentInput) // convert the current string input into a float value
            currentInput = operate(firstNum, secondNum, currentOperater)
            firstNum = null
            currentOperater = null
        }
    }else if (["+", "-", "*", "/"].includes(value)) {
        if (firstNum === null) {
            firstNum = parseFloat(currentInput);// convert the current string input into a float value
        } else if (currentOperater !== null) {
            secondNum = parseFloat(currentInput)
            firstNum = operate(firstNum, secondNum, currentOperater)
            currentInput = firstNum.toString();
        }
        currentOperater = value // Sets current operator to the input value of +, -, *, or /
        resetScreen = true // reset screen to display result
     } else {
        if (resetScreen) {
            currentInput = value // display the result as the current input
            resetScreen = false 
        } else {
            // Add the next value to the current to update the current input and create a string of values
            currentInput += value;
        }
      
    }
    // Call the updateDisplay function to update the screen with the currentInput
    updateDisplay();
  }

  function updateDisplay() {
    // Display the values in the screen div
    screen.innerText = currentInput;
  }

  // Map the keys to the expected value for keydown event
  const keyMap = {
    Delete: "Clear",
    "(": "(",
    ")": ")",
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
        return divide(num1, num2);
      default:
        return null  
    }
  }
};
