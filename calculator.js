// operators.js

const container = document.getElementById('container');
const keysElement = document.getElementById('keys');

window.onload = function () {
function makeKeys(numberOfKeys) {
    for (let i = 0; i < numberOfKeys; i++) {
        let row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);

        for (let c = 0; c < numberOfKeys; c++) {
            let col = document.createElement("div");
            col.className = "col";
            col.innerText = valuesArray[i * numberOfKeys + c]; // Assign value from the array
            row.appendChild(col);  
            row.appendChild(col);
        }
    }
}

const valuesArray = ["1", "2","3","+","4","5","6","-","7","8","9","*","**","0","=","/",];
    makeKeys(4);

// Create math functions
function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2){
    return num1 - num2
}

function multiply(num1, num2){
    return num1 * num2
}

function div(num1, num2) {
    return num1 / num2
}

}