//call signature - declaration of a function type - the type of the function - the type of the function's signature
// it includes the name of the function, the number of parameters, 
//the type of each parameter, and the return type of the function

interface Product {
  name: string;
  price: number;
  qty: number;
  getPrice: (required: string) => string
}

const calculatePrice = (product: Product): string => {
  return `The price of ${product.name} is ${product.price * product.qty}`;
}

const product2: Product = {
  name: "iPhone",
  price: 699,
  qty: 2,
  getPrice: (required: string): string => {
    return `The price of ${product2.name} is ${product2.price * product2.qty} and it is ${required.trim()}`;
  }
}



// console.log(calculatePrice(product2))
console.log(product2.getPrice("not required"));