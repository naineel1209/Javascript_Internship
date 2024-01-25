"use strict";
//! Default parameters
function greet(name = "default string", digit = 6969) {
    console.log(`Hello ${name}, your fav number is ${digit}`);
    return 1;
}
greet("John", 10);
greet("John");
greet(undefined, 10);
greet();
//Optional Parameter
function greet2(name, digit) {
    console.log(`Hello ${name}, your fav number is ${digit}`);
    return 1;
}
greet2("John", 10);
greet2("John");
