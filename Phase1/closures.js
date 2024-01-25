//! Lexical Scope
//whenever the innerFunction which wants to access a variable which it doesn't have, it will keep on searching in the outer scopes of it until it finds a value for the variable

//! Closures
function outerFunction() {
    let outerVar = "I'm from outerFunction";

    function innerFunction() {
        // innerFunction forms a closure, capturing outerVar
        console.log(outerVar); // Accessing outerVar from the outer scope
    }

    return innerFunction;
}

// outerFunction is invoked, and it returns innerFunction
let closureFunction = outerFunction();
console.log(typeof closureFunction)
// Now, closureFunction is a closure that "remembers" outerVar
closureFunction()// Outputs: I'm from outerFunction

const spacing = '10px'; 
const styles =  
      `padding: ${spacing}; background-color: white; color: green; font-style:  
       italic; border: 1px solid black; font-size: 2em;`; 
console.log('%cGeeks for Geeks', styles);