//! function inside function
const obj = {
    name: "John",
    age: 30,
    sayHi: () => {
        console.log(this, 1)
        function sayHi2() {
            console.log(this)
        }
        // const sayHi2 = () => {
        //     console.log(this);
        // }
        sayHi2();
    }
}

obj.sayHi();