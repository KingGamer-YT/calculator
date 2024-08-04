// Select all link elements in the document and store them in the variable 'links'
const links = document.querySelectorAll("link");

// Select all input elements in the document and store them in the variable 'toggleBtn'
const toggleBtn = document.querySelectorAll("input");

// Select the element with the attribute 'data-previous-operand' and store it in the variable 'prevOperandText'
const prevOperandText = document.querySelector("[data-previous-operand]");

// Select the element with the attribute 'data-current-operand' and store it in the variable 'currentOperandText'
const currentOperandText = document.querySelector("[data-current-operand]");

// Select the element with the attribute 'data-delete' and store it in the variable 'deleteBtn'
const deleteBtn = document.querySelector("[data-delete]");

// Select the element with the attribute 'data-output' and store it in the variable 'resultBtn'
const resultBtn = document.querySelector("[data-output]");

// Select the element with the attribute 'data-reset' and store it in the variable 'resetBtn'
const resetBtn = document.querySelector("[data-reset]");

// Select all elements with the attribute 'data-num' and store them in the variable 'operands'
const operands = document.querySelectorAll("[data-num]");

// Select all elements with the attribute 'data-operator' and store them in the variable 'operatorBtn'
const operatorBtn = document.querySelectorAll("[data-operator]");

// Initialize 'prevOperand' with the inner text of the element stored in 'prevOperandText'
let prevOperand = prevOperandText.innerText;

// Initialize 'currentOperand' with the inner text of the element stored in 'currentOperandText'
let currentOperand = currentOperandText.innerText;

// Initialize 'operation' variable to store the current operation selected by the user
let operation;

// Function to change the theme of the calculator based on the input value 'i'
function themeChange(i) {
    // If the value of 'i' is "0", set the href attribute of the third link element to an empty string
    if (i === "0") {
        links[2].setAttribute("href", "");
    } else {
        // Otherwise, set the href attribute of the third link element to the corresponding theme CSS file
        links[2].setAttribute("href", `css/theme${i}.css`);
    }
}

// Function to reset the calculator's state by clearing the previous operand, current operand, and operation
function reset() {
    prevOperand = "";  // Clear the previous operand
    currentOperand = "";  // Clear the current operand
    operation = undefined;  // Clear the current operation
}

// Function to delete the last character of the current operand
function deleteOperand() {
    // Convert currentOperand to a string, remove the last character, and update currentOperand
    currentOperand = currentOperand.toString().slice(0, -1);
}

// Function to add a number to the current operand
function addNumber(number) {
    // If the number is a decimal point and the current operand already includes a decimal point, do nothing
    if (number === "." && currentOperand.includes(".")) return;
    // Otherwise, convert currentOperand and the number to strings, concatenate them, and update currentOperand
    currentOperand = currentOperand.toString() + number.toString();
}

// Function to select an operation and update the operands
function operationSelection(operate) {
    // If currentOperandText is empty, do nothing
    if (currentOperandText === "") return;
    // If prevOperandText is not empty, perform the current operation
    if (prevOperandText !== "") {
        calculatorOperation();
    }
    operation = operate;  // Set the current operation to the selected operation
    prevOperand = currentOperand;  // Move the current operand to the previous operand
    currentOperand = "";  // Clear the current operand
}

// Function to perform the calculation based on the selected operation
function calculatorOperation() {
    let result;  // Declare a variable to store the result
    let prev = parseFloat(prevOperand);  // Convert the previous operand to a floating-point number
    let current = parseFloat(currentOperand);  // Convert the current operand to a floating-point number

    // If either operand is not a number, do nothing
    if (isNaN(prev) || isNaN(current)) return;

    // Perform the calculation based on the selected operation
    switch (operation) {
        case "+":
            result = prev + current;  // Add the operands
            break;
        case "-":
            result = prev - current;  // Subtract the operands
            break;
        case "×":
            result = prev * current;  // Multiply the operands
            break;
        case "/":
            result = prev / current;  // Divide the operands
            break;
        default:
            return;  // If no valid operation is selected, do nothing
    }

    currentOperand = result;  // Update currentOperand with the result
    operation = undefined;  // Clear the current operation
    prevOperand = "";  // Clear the previous operand
    prevOperandText.innerText = "";  // Clear the display of the previous operand
}

// Function to update the display of the operands and operation
function displayNum() {
    // Display the current operand as a localized string
    currentOperandText.innerText = currentOperand.toLocaleString("en");
    // If an operation is selected, display the previous operand and operation
    if (operation !== undefined) {
        prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
    } else {
        // Otherwise, display only the previous operand
        prevOperandText.innerText = prevOperand;
    }
}

// Add event listeners to the theme toggle buttons
toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        themeChange(btn.value);  // Change the theme based on the button value
    });
});

// Add an event listener to the reset button
resetBtn.addEventListener("click", () => {
    reset();  // Reset the calculator state
    displayNum();  // Update the display
});

// Add an event listener to the delete button
deleteBtn.addEventListener("click", () => {
    deleteOperand();  // Delete the last character of the current operand
    displayNum();  // Update the display
});

// Add event listeners to the operand buttons
operands.forEach(operand => {
    operand.addEventListener("click", () => {
        addNumber(operand.innerText);  // Add the number to the current operand
        displayNum();  // Update the display
    });
});

// Add event listeners to the operator buttons
operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        operationSelection(btn.innerText);  // Select the operation based on the button text
        displayNum();  // Update the display
    });
});

// Add an event listener to the result button
resultBtn.addEventListener("click", () => {
    calculatorOperation();  // Perform the calculation
    displayNum();  // Update the display
});
