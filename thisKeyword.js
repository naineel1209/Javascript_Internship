// 00:00 🔑 JavaScript's "this" keyword can be confusing for many and behaves differently in various scenarios.
// 00: 55 🔑 The behavior of the "this" keyword depends on the context, such as whether it's in a function, global space, or an arrow function.
// 04: 17 🔑 In the global space, the value of "this" is the global object, which can vary depending on the JavaScript runtime environment(e.g., window in browsers, Global in Node.js).
// 07: 30 🔑 Inside a function, the value of "this" can be undefined in strict mode or the global object in non - strict mode.
// 10:06 🔑 JavaScript uses a mechanism called "this substitution," where "this" is replaced with the global object when it's undefined or null in non-strict mode.
// 16: 11 🔑 Inside an object's method, "this" refers to the object itself where the method is called.
// 21: 11 🔑 "call," "apply," and "bind" are important functions used to manipulate the value of "this" when calling methods and sharing them between objects.
// 26: 23 🔑 It's essential to understand "call," "apply," and "bind" to effectively control the value of "this" in JavaScript methods.
// 27: 30 🔑 In global space, the 'this' keyword refers to the global object(e.g., 'window' in the browser).
// 28:08 🔑 In strict mode, 'this' inside a function is undefined; in non - strict mode, it refers to the global object.
// 35: 23 🔑 Understanding "this" substitution: When 'this' is undefined or null inside a function, it becomes the global object.
// 39: 59 🔑 Inside an object's method, 'this' refers to the object itself.
// 44: 12 🔑 The 'call' method can be used to invoke a function with a specific 'this' context.
// 46:01 🔑 Arrow functions do not have their own 'this' binding and take the value of the enclosing lexical context.
// 48: 46 🔑 In the context of DOM elements, 'this' refers to the specific HTML element being interacted with.

// console.log(this)

// const obj = {
//     a: "abc",
//     meth: function () {
//         console.log(this)
//     },
//     ultra: () => {
//         console.log(this)
//     }
// }

// obj.meth()
// obj.ultra()

// //! example

// const stud1 = {
//     name: "Naineel",
//     printName: function () {
//         console.log(this.name)
//     }
// }

// const stud2 = {
//     name: "Mandeep",
// }

// stud1.printName()
// stud1.printName.call(stud2) // calls the function for us
// let maroon = stud1.printName.bind(stud2) // binds and returns the new function
// console.log(typeof maroon)

// ! Nested Arrow function
const obj2 = {
    a: "Naineel",
    func: function () {
        console.log(this) // refers to the object's 
        const func2 = function () {
            console.log(this); // its own this context - // this substitution
        }
        const func3 = () => {
            console.log(this) // refers to the lexical context
        }
        func2()
        func3()
    }
}

obj2.func()