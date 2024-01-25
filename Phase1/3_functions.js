// ! default parameters and rest parameters -> rest parameters go in as array object
function showMsg(a = "100", ...params) {
  for (let x of params) {
    console.log(x)
  }
  console.log(params)
}

showMsg(1, 2, 3, 4, 5)


function returningFunc(param = "Anonymous") {
  return "Hello " + param
}

console.log(returningFunc("My name is Slim Shady!"))

//default returning of the function = undefined

// A function should do exactly what is suggested by its name, no more.

// Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

// A few examples of breaking this rule:

// getAge – would be bad if it shows an alert with the age (should only get).
// createForm – would be bad if it modifies the document, adding a form to it (should only create it and return).
// checkPermission – would be bad if it displays the access granted/denied message (should only perform the check and return the result).




// ! parameters passed by values and references

// variables are copied locally to the function and are not affected by the function 
// variables cannot be passed by reference in javascript
// only objects are passed by reference like arrays, objects, functions, etc

// function-expression
const func = function () {
  console.log("hello")
}

func()

// function declaration

function func2() {
  console.log("hello")
}

func2()

//! Callback functions - functions that are passed in expectance of it being called later on when neccessary

function printName(consent, name) {
  if (consent) {
    name();
  }
}

printName(true, () => console.log("Naineel")) //! second parameter is a callback function

//!  difference between function declaration and function expression

// function declaration can be called before it is defined
// function expression cannot be called before it is defined - it is created when the execution reaches it and is usable only after that

// global function declaration - can be called anywhere in the code doesnot depend on where it is defined globally

// function declaration inside a block - can be called only inside the block (anywhere inside the block) - not outside the block


// ! globally accessing the function defined in the block - function expression

let func3;

if (true) {
  func3 = function () { console.log("Hi!"); };
}

func3();

// ! Arrow Functions - same usablity as function expressions but with a shorter syntax

let func4 = (a, b) => a + b; // single line arrow functins

console.log(func4(1, 2))

// Arrow functions are having no concept of "this" - they always take this from the global context

let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => console.log(this) // here this's context is of the object (which is the global context)
    );
  }
};

let group2 = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function (student) {
      console.log(this)// here this's context is of the function not the object
    });
  }
};
group2.showList();

// ! task - https://javascript.info/task/rewrite-arrow

const ask = (consent, yes, no) => {
  if (consent) {
    yes();
  } else {
    no();
  }
}

ask(false, () => console.log("Agreed"), () => console.log("Denied"))

