
//! Default parameters
function greet(name: string = "default string", digit: number = 6969): number {
  console.log(`Hello ${name}, your fav number is ${digit}`);

  return 1;
}

greet("John", 10);
greet("John");
greet(undefined, 10);
greet();

//Optional Parameter
function greet2(name: string, digit?: number): number {
  console.log(`Hello ${name}, your fav number is ${digit}`);

  return 1;
}

type prod1 = {
  readonly name: string;
  price: number;
  qty: number;
}

const product1: prod1 = {
  name: "iPhone",
  price: 699,
  qty: 2,
}

// product1.name = "Samsung";

greet2("John", 10);
greet2("John");