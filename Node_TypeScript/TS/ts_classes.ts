class User {

    #city: string; // private property - only accessible within the class

    // constructor(email: string, password: string) {
    //     this.#city = "";
    //     this.email = email;
    //     this.password = password;
    // }

    //another way to use the constructor
    constructor(public email: string, public password: string, city?: string) {
        this.#city = city || "";
    }

    set cityAdder(city: string) {
        console.log(this.#privateMethod());
        this.#city = city;
    }


    #privateMethod() {
        console.log("private method");
    }
}

const user1 = new User("naineelsoyantar@gmail.com", "1234567890");

console.log(typeof user1, user1);
user1.cityAdder = "New York";
console.log(typeof user1, user1);