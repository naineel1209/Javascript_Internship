"use strict";
//!boolean - true or false values
const isSunday = true;
//!bigInt - larger integers than the number type can hold
const bigNum = 100n;
console.log(isSunday, bigNum);
//check even nos.
const num = 10;
const evenNum = (num % 2) === 0;
console.log(evenNum);
//is divisible by 4 , 8 or both
const isDivisibleBy48 = (num) => {
    if (num % 4 === 0 && num % 8 === 0) {
        return true;
    }
    else if (num % 4 === 0) {
        return true;
    }
    else if (num % 8 === 0) {
        return true;
    }
    else {
        return false;
    }
};
console.log(isDivisibleBy48(16));
//! BigInt 
const num2 = 9007199254740991n;
const num3 = 9007199254740992n;
const anotherSum = num2 + num3;
console.log((anotherSum));
console.log(String(anotherSum));
