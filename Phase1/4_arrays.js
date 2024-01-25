//! Arrays

let arr = new Array();
let arr2 = []; //shorthand

arr.push("Maroon", "5", 5, "Black", 1.2)
console.log(arr);

// ! at function - return element at index - works negatively as well
console.log(arr.at(-2))

// normal method - pop (remove) - push (add) at last
// normal methods - unshift (add at first) - shift (remove from first)

//Queue uses - shift and push
//Stack uses - pop and push


// arrays are objects
arr.age = 25
console.log(arr)

// this does not iterate over non-numeric keys
for (let item of arr) {
    console.log(item)
}

// for..in is for all keys of the object
for (let miso in arr) {
    console.log(miso, arr[miso])
}

delete arr.age
console.log(arr)


//! tasks - 

const arr3 = ["Jazz", "Blues", "Maroon"]
console.log(arr3)
arr3.push("Rock-n-Roll");
console.log(arr3);
for (let i = 0; i < arr3.length; i++) {
    console.log(i, Math.floor((arr3.length - 1) / 2))
    if (i == (Math.floor((arr3.length - 1) / 2))) {

        arr3[i] = "Classics";
    }
}
console.log(arr3)
console.log(arr3.shift())

arr3.push(function () {
    console.log(this)
})

console.log(arr3[3]())

//! Kadane's Algorithm

function getMaxSum(arr) {
    let maxSum = 0;
    let currSum = 0;

    for (let item of arr) {
        currSum += item;

        maxSum = Math.max(currSum, maxSum);
        if (currSum < 0) {
            currSum = 0
        }
    }

    return maxSum;
}

//! Array methods

// Splice - insert, remove and replace
const months = ['Jan', 'Feb', 'March']

months.splice(1, 0, "May", "June", "July", "August") // the layout is simple - insert (index) - delete (count) - replace
console.log(months)


// Slice - copies from start to end
console.log(months.slice(1, 3))


// ! …But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s treated as an array by concat: its elements are added instead:

// indexOf/ lastIndexOf
console.log(months.indexOf("May"))
console.log(months.lastIndexOf("June"))

// includes
console.log(months.includes("May"))

// find
console.log(months.find(item => console.log(item)))

let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" }
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

console.log(someUsers.length); // 2

// filter, map, reduce, sort
let newUsers = users.map(({ id, name }, idx) => {
    return {
        id,
        name,
        idx
    }
})

console.log(newUsers)

// sort(fn) - fn = comparision function

const arrx = [5, 4, 3, 2, 1]

arrx.sort((a, b) => {
    return a - b;
})

console.log(arrx);

// reverse
let arry = arrx.reverse();

// split and join - splits the string over a delimiter and transforms it into an array and then it can be joined 


//! reduce - reduce((acc, item, index, idx, array) => {}, initialValue

console.log(arrx.reduce((a, item, idx) => {
    return a + item
}, 15))

// isArray function

// task

function camelize(str) {
    console.log(str.split('-').map((item, idx) => {
        return (idx == 0) ? item : item[0].toUpperCase() + item.slice(1)
    }).join(''))
}

camelize('background-color')

// task

function filteredRange(arr, a, b) {
    return arr.filter((item) => a <= item && item <= b)
}

console.log(filteredRange([1, 2, 3, 4, 5, 6, 7], 4, 9))

// ! Shuffling the array in o(n)
function shuffle(arr) {
    console.log(arr)
    for (let i = arr.length - 1; i > 0; i--) {
        //generate rand_index
        let j = Math.floor(Math.random() * (i + 1))
        console.log(j)
        // [arr[j], arr[i]] = [arr[i], arr[j]]
        let t = arr[j];
        arr[j] = arr[i];
        arr[i] = t;
    }
    return arr;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8]));

// ! keyed object

function groupById(users){
    let finalObj = {}

    for(let item of users){
        finalObj[item.id] = item;
    }
    console.log(finalObj);
}

let users2 = [
    { id: 'john', name: "John Smith", age: 20 },
    { id: 'ann', name: "Ann Smith", age: 24 },
    { id: 'pete', name: "Pete Peterson", age: 31 },
];

let usersById = groupById(users2);
