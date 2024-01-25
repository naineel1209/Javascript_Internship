//! Classes

// A class could be looked at as a template for creating objects. This template class is also helpful in setting initial values for members of the class and providing behaviors to certain other members (methods).


//these are class declarations
class EmployeeRecords {
    // properties
    name = "New User";
    id = 0;

    //constructor
    constructor(firstName, lastName, id) {
        this.name = `${firstName} ${lastName}`;
        this.id = id;
    }

    //methods
    getMyAge(age, name) {
        console.log(age, name)
    }

    //getter and setters using get and set keywords - accepting single parameters
}

const emp1 = new EmployeeRecords("Naineel", "Soyantar", 2020);
emp1.getMyAge(69, "naineel")
console.log(emp1)

// classes also have class expressions
//! getters - gets the value - can be called by accessing the object
//! setters - sets the value when we want to change the value
const DupliEmployee = class {

    // properties
    name = "New User";
    id = 0;

    constructor(firstName, lastName, id) {
        this.name = `${firstName} ${lastName}`;
        this.id = id;
    }

    get empFullName() {
        return `${this.name}`
    }

    /**
     * @param {string} name //! single parameter
     */
    set empName(name) {
        this.name = name;
    }

}

const emp2 = new DupliEmployee("Soyantar", "Naineel", 2021);
emp2.empName = "Naineel Soyantar"
console.log(emp2)
console.log(emp2.empFullName)

//! public, protected and private classes

//! Public - members of the class are public and can be accessed by any object that was created

class ObjectCreate {
    name;

    constructor(name) {
        this.name = name;
    }

    sayMyName() {
        return `${this.name}`
    }
}

const objc1 = new ObjectCreate("naineel");
console.log(objc1.sayMyName())

//! Private variables are only accessible by the members of the class, not the 

class ObjectCreator2 {
    #privateName

    constructor(name) {
        this.#privateName = name;
    }

    get myName() {
        return `My Name is ${this.#privateName}`
    }

    set myName(name) {
        this.#privateName = name;
    }
}

const objc2 = new ObjectCreator2("Naineel Soyantar");
console.log(objc2.myName)
objc2.myName = "Michael Jackson"
console.log(objc2.myName)

class ObjectCreator3 extends ObjectCreator2 {
    constructor(name) {
        super(name);
    }

    get myName() {
        return super.myName;
    }
}

// ! protected is hard to implement - but not impossible

class NameGenerator {
    _name;

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }
}

let nameGenerator = new NameGenerator("John");
console.log(`My name is ${nameGenerator.name}`); // My name is John
nameGenerator.name = "Jane"; // Cannot assign to 'name' because it is a read-only property

//!  Inheritance - extending a class to let its child elements access its properties as well as variables

class Person {
    name;
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return `Hello, ${this.name}`
    }
}

class Male extends Person {
    gender;

    constructor(name) {
        super(name, 19);
        this.gender = "Male";
    }
}

const m1 = new Male("Naineel");
console.log(m1.getName());


//! Object Mixin - Object.assign(Employee.prototype, employeeDetails); where employeeDetails is an object defined elsewhere where all the implementing functions are there

// ! Static - can be called anywhere through the class
// doesnot depend upon the object created

class Person2 {
    name;
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    static orderByAge(a, b) {
        return a.age - b.age;
    }

    static sayMyName(person) {
        return person.name;
    }
}

const me = new Person2("Parwinder", 101);

console.log(me.name); // Parwinder => this is valid
console.log(me.age); // 101 => this is valid
console.log(Person.orderByAge); // undefined or Property 'orderByAge' is a static member of type 'Person' 🚨
console.log(me.sayMyName); 