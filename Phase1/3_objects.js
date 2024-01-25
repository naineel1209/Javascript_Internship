//! Object initialisation
//? 1. Object literal
let obj1 = {
    name: "Naineel",
    age: 21,
}

//? 2. Object constructor
let obj2 = new Object({
    name: "Naineel",
    age: 21,

    "likes movies": true
})

console.log("Likes Movies", obj2["likes movies"])

// delete key from object
delete obj1.name;
console.log(obj1)

// ! [] - square brackets - can be used to access the property of the object
// only square brackets can set a property name from a variable
// dot operator cannot do that

let obj3 = {
    [obj2.name]: "name",
    [obj2.age]: "age",
}

console.log(obj3)

// !Reading a non-existing property just returns undefined. So we can easily test whether the property exists:

//! for..in loop - used to traverse all the keys of the object and then return the value of the key

for (let key in obj2) {
    console.log(key + " : " + obj2[key])
}

//! integer properties are sorted, others appear in creation order. The details follow.
let codes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ..,
    "+1": "USA"
};

for (let code in codes) {
    console.log(Number(code)); // 49, 41, 44, 1
}


//! task - https://javascript.info/task/hello-object
const user = {

}
user.name = "John";
user.surname = "Smilga";
console.log(user)
user.name = "Johnny";
console.log(user)
delete user.name;
console.log(user)

//! task - https://javascript.info/task/is-empty
function isEmpty(obj) {
    // for (let key in obj) {
    //     return false;
    // }
    // return true;

    return Object.keys(obj).length === 0;
}
console.log(isEmpty(user))


//! task - https://javascript.info/task/sum-object
function sumSalaries(obj) {
    return Object.values(obj).reduce((a, b) => a+b, 0)
}

const salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

console.log(sumSalaries(salaries))

//! task - https://javascript.info/task/multiply-numeric

function multiplyNumeric(obj){
    Object.keys(obj).forEach(key => {
        if(typeof obj[key] == "number"){
            obj[key] *= 2;
        }
    })
}

const menu = {
    width: 200,
    height: 300,
    title: "My menu"
}
multiplyNumeric(menu)
console.log(menu)

// ! Object references and copying 
// objects are stored and copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”.

let user2 = {
    name: "John"
};

let admin = user2
user2.name = "Pete"

console.log(admin)

// two independent objects are not the same
let a = {};
let b = {}; // two independent objects

console.log( a == b ); // false

//! Object.assign - used to assign the properties of one object to another object - shallow copy
// if the property is already present in the object then it will be overwritten
// if the property is not present in the object then it will be created


//! Object nested in an object requires deep copying - recursively
// runaround to this is structuredClone(obj) - but it is not supported by all the browsers