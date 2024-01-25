// Function to calculate the sum of two numbers
function addNumbers(a, b) {
    console.log("Adding numbers:", a, b);
    return a + b;
}

// Function to multiply two numbers
function multiplyNumbers(a, b) {
    console.log("Multiplying numbers:", a, b);
    return a * b;
}

// Main function
function main() {
    console.log("Starting the program...");

    // Get user input
    const num1 = parseInt("96");
    const num2 = parseInt("69");

    // Perform calculations
    const sum = addNumbers(num1, num2);
    const product = multiplyNumbers(num1, num2);

    console.log("Sum:", sum);
    console.log("Product:", product);

    console.log("Program completed.");
}

// Call the main function
main();
