"use strict";
//Interface is a kind of contract for an object that the object must follow in order to be considered a valid object
const obj = {
    name: "John",
    age: 30,
    isMarried: false,
    address: {
        street: "123 Main St",
        city: "New York",
    },
};
console.log(obj);
// obj.name = 6969;
obj.name = "Jane";
console.log(obj);
//HW
var MyFunc;
(function (MyFunc) {
    const product = {
        name: "iPhone",
        price: 699,
        qty: 2,
    };
    console.log(product);
    MyFunc.calculatePrice = (product) => {
        return product.price * product.qty;
    };
    console.log(MyFunc.calculatePrice(product));
})(MyFunc || (MyFunc = {}));
