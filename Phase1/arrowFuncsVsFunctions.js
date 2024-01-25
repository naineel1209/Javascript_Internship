//! 1. no arguments property in arrow functions 
function created(maroon, black, blue, maximus) {
    console.log(arguments)
}

const created2 = (cannot, happen) => {
    console.log(arguments)
}

created("123", "123", "123", "123", "123")
created2(12, 12)


//! 2. this keyword is not created
const obj = {
    "1": {
        "arrow": () => {
            console.log(this)
        },
        "normalFunc": function () {
            console.log(this)
        }
    }
}

// console.log(obj["1"]["k"]())
obj["1"]["arrow"]()
obj["1"]["normalFunc"]()

//! function declarations are not for arrow functions
function namedFunc() {

} // this is a function declaration

const named2 = () => { } // this is assigning the value of the arrow function expression to the variable named2

// ! no accessing before initialization for function expressions
maroon2()
// maroon() // ! this line gives an error
const maroon = function () {
    console.log("maroon")
}

function maroon2() {
    console.log("maroon2");
}