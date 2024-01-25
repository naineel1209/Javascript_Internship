"use strict";
//ANY - the value can be of ANY datatype - so that means it can be a string, number, boolean, array, object, etc.
let favNum = 10;
console.log(favNum);
favNum = "10";
console.log(favNum);
favNum = true;
console.log(favNum);
//! UNKNOWN - the value can be of ANY datatype - so that means it can be a string, number, boolean, array, object, etc.
//but it still enforces type checking and type safety
async function dataFetch() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data;
}
async function dataFetch2() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data;
}
async function processData() {
    const result = await dataFetch();
    const result2 = await dataFetch2();
    // Explicit type checking is required before using the result
    if (Array.isArray(result)) {
        console.log(result.length); // TypeScript allows this after type check
    }
    else {
        console.log('Invalid data');
    }
    // No type checking is required before using the result
    console.log(result2.length); // TypeScript allows this without type check - this is type safety
    //any will allow any operation on the result array without error
    //unknown will not allow any operation on the result array without type checking
}
processData();
