//! First Class functions - meaning that we can do everything that we do with other types such as assigning them to variables.this means that the language supports constructing new functions during the execution of a program, storing them in data structures, passing them as arguments to other functions, and returning them as the values of other functions.

function hello(MGK){
    console.log("Hello")
}

hello(
    "mgk"
)
hello.language = "Marathi"
hello()
console.log(hello)
console.log(hello.name) // returns the function names
console.log(hello.arguments)


const xyz = function(){
    console.log("xyz")
}

console.log(xyz.name)