// Function constructor for an object
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Instantiate an object
const person1 = new Person('John', 'Doe');

// Logging the object
console.log(person1); // { firstName: 'John', lastName: 'Doe' }

// Adding a property dynamically
person1.age = 30;

// Logging the object after dynamic property addition
console.log(person1); // { firstName: 'John', lastName: 'Doe', age: 30 }

// Adding another property dynamically
person1.gender = 'Male';

// Logging the object after another dynamic property addition
console.log(person1); // { firstName: 'John', lastName: 'Doe', age: 30, gender: 'Male' }
