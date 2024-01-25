// 1. Introduction 

// variables 
let msg = "Pass this message to the rightful owner"
console.log(msg);

const msg2 = 45
console.log(msg2);

console.log(typeof msg + " " + typeof msg2)

// declaring constant variables - using these we can easily access the constants without remebering it
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// camelCase works just fine and are human redable 
const userName = 'naineel.soyantar'

// task - 1 - https://javascript.info/task/hello-variables
let admin, name;

name = "Admin";
admin = name;

console.log(admin)

// task - 2 https://javascript.info/task/declare-variables

const homePlanet = "Earth";
const currentVisitor = "Random John 123";

// task - 3 https://javascript.info/task/uppercast-constant

const BIRTHDAY = "12.09.2002";
const age = "calculated something at run-time"


// datatypes 

let m = 1, n = 1.2, o = "naineel", p = { x: "naineel soyantar" }, q = Infinity, r = 1234567890123456789012345678901234567890n, u = 123456789012345678901234567890n, bool = true, s = null, t = NaN;

console.log(r + u);

console.log(typeof m)
console.log(typeof n)
console.log(typeof o)
console.log(typeof p)
console.log(typeof q)
console.log(typeof r)
console.log(typeof s)
console.log(typeof t)
console.log(typeof bool)

// String template Literals

let c = "naineel";

console.log(`String Template Literal => hello, ${c}`)

// task - 4 https://javascript.info/task/string-quotes
console.log(`hello ${1}`) //hello 1
console.log(`hello ${name}`); //hello Admin
console.log(`hello ${"name"}`) //hello name

// type conversions

let num1 = 55;
let num2 = String(num1);

console.log(typeof num2)

const bool2 = Boolean(55 / 10) // truly and falsy values concept
console.log(bool2);

// Mathematical Operators
// + , - , % (MODULO), *, /, **(exponentiation)

console.log(+25 + -(89)) // unary operators takes high precedences

// assignment operation
let a1;
let b1 = c1 = 3 - (a1 = 2 + 1) // assignment happens very differently in jaavscript
// above b1 is declared using chaining property in
console.log(c1);

// increment
console.log(++a1)

//tasks - https://javascript.info/task/increment-order
let a = 1, b = 1;
let c2 = ++a; //2
let d2 = b++ //1

// tasks - https://javascript.info/task/assignment-result
let a2 = 2
let x = 1 + (a2 *= 2) // x = 5

//tasks - https://javascript.info/task/primitive-conversions-questions
"" + 1 + 0 // "10"
"" - 1 + 0 // -1
true + false // 1
6 / "3" //2
"2" * "3" // 6
4 + 5 + "px" // 9px
"$" + 4 + 5 // $45
"4" - 2 // "2"
"4px" - 2 //NaN
"  -9  " + 5 // " -9 5"
"  -9  " - 5  // -14
null + 1 // 0 + 1 = 1
" \t \n" - 2 // -2
undefined + 1 // NaN