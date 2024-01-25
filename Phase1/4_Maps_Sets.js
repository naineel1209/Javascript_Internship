// !Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

// Methods and properties are:

// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the element (the key/value pair) by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.


const map = new Map();
map.set("1", "Maroon");
console.log(map.get("1"))

const users = {
    name: "Naineel",
    age: "21"
}

map.set(users, "yeahhhhhhhhhhh")

// map.keys() – returns an iterable for keys,
// map.values() – returns an iterable for values,
// map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of

for (let keys of map.keys()) {
    console.log(keys, map.get(keys))
}

// also accessible to forEach
map.forEach((val, key, map) => {
    console.log(key, val)
})

// When a Map is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

// array of [key, value] pairs
let map2 = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

console.log(map2.get('1')); // str1



//! Sets  - A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

// Its main methods are:

// new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
// set.add(value) – adds a value, returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.

const set = new Set(['Mountains', 'Rivers', 'Landscapes', 'Plateaus'])

for (let value of set) console.log(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
    console.log(value);
});

//tasks - 

function unique(arr) {
    return Array.from(new Set(arr))
}

// tasks - filter anagrams
function filterAnagrams(arr) {
    let set2 = new Set();
    arr.forEach((item, idx) => {
        let uniq = item.toLowerCase().split('').sort().join('')
        set2.add(uniq)
    })

    return Array.from(set2)
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
console.log(filterAnagrams(arr))

let john = {
    name: 'John'
}

const map3 = new Map();
map3.set(john, "xyz");

// john = null

console.log(map3.keys())
//! WeakMap - keys must be objects

// The main area of application for WeakMap is an additional data storage.

// If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then WeakMap is exactly what’s needed.

// We put the data to a WeakMap, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

const weakMap = new WeakMap()
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically

// very analogous is WeakSet
weakMap.get(john) // secret documents