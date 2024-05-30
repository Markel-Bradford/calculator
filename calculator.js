// operators.js

const container = document.getElementById("container");
const keysElement = document.getElementById("keys");

window.onload = function () {
  const valuesArray = [
    "c",
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
        col.innerText = valuesArray[i * numberOfColumns + c]; // Assign value from the array
        row.appendChild(col);
        row.appendChild(col);
      }
    }
  }

  makeKeys(5, 4);

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

  function div(num1, num2) {
    return num1 / num2;
  }
};
