// 2. if, if else, if..else if..else, switch

// if statments
let name = "naineel";

if (name === "naineel")
    console.log("yess, you are right")
//else if
else if (name == "maroon")
    console.log("you are partially correct")
// else clause
else
    console.log("no, you are wrong")


// ternanry operators ?:

let m1 = (name == "naineel") ? "right" : "wrong";

console.log(m1);

// Logical Operators

// OR (||) -  finds the first truthy value
console.log("" || ("123" && "maroon 5"))

// AND (&&) - finds the last falsy value 
console.log("123" && "jsk") //jsk
console.log(false && "jsk") // false

// ! NOT
console.log(!true, !false)

// task https://javascript.info/task/check-if-in-range
const age = 92;
if (!(age >= 14 && age <= 90)) {
    console.log("yellow");
} else {
    console.log("jellow")
}

// task - https://javascript.info/task/check-login
// const person = prompt("Who's there?");

// if(person === "Admin"){
//     const password = prompt("What's the password??")
//     if(password === "TheMaster"){
//         console.log("Welcome")
//     }else if(password === "Cancel"){
//         console.log("You exited the system")
//     }else{
//         console.log("Wrong password ")
//     }
// }else if(password === "Cancel"){
//     console.log("You exited the system")
// }else{
//     console.log("Wrong Credentials")
// }

// Null Coalescing Operator - a ?? b -> if a is defined then a or else b
// || returns the first truthy value.
// ?? returns the first defined value.

let height = 0;

// console.log(height || 100); // 100
// console.log(height ?? 100); // 0


//looping 
const z = 99;
let x = 0;
while (1 && x <= z) {
    console.log(x++)
}

x = 0;

do {
    console.log(x++);
} while (x <= z)

x = 0;

for (; x < z; x++) {
    console.log(x);
}

//another set of control statments
x = 0;

for (; x < z; x++) {
    if (x % 2 == 0) {
        continue;
    }

    console.log(x)

    if (x == 9) {
        break;
    }
}

//labelled break is also allowed

label1: {
    console.log("maroon1")
    break label1
}

// task - https://javascript.info/task/for-even

for (let i = 2; i < 11; i++) {
    ((i & 1) == 0) ? console.log(i, "Odd") : console.log(i, "Even")
}

//task - https://javascript.info/task/repeat-until-correct

while (1) {
    if (Math.floor(Math.random() * 500) <= 100) {
        console.log("done")
    } else {
        console.log("exiting")
        break;
    }
}

//task - https://javascript.info/task/list-primes
function isPrime(n) {
    if (n == 1) {
        return "Invalid No. selected"
    } else {
        for (let j = 2; j <= Math.sqrt(n); j++) {
            if (n % j == 0) {
                return false
            }
        }

        return true;
    }
}

for (let i = 2; i <= 100; i++) {
    console.log(i, isPrime(i));
}

//switch statment - 
const val = "white"

switch (val) {
    case "maroon":
        console.log("this is a maroon song");
        break;
    case "white":
        console.log("this is a white dawg");
    default:
        console.log("default action")
}