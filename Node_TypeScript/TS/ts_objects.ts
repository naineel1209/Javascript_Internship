//Interface is a kind of contract for an object that the object must follow in order to be considered a valid object

interface Address {
  street: string;
  city: string;
}

type Person = {
  name: string;
  age: number;
  isMarried: boolean;
  address: Address;
}

//type - broader term - used to describe any kind of data type
// ?: optional type
type BroadAddress = {
  street: string;
  city: string;
};

type BroadPerson = {
  name: string;
  age: number;
  isMarried: boolean;
  address: BroadAddress;
};

const obj: Person = {
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


namespace MyFunc {
  type Product = {
    name: string;
    price: number;
    qty: number;
  };

  const product: Product = {
    name: "iPhone",
    price: 699,
    qty: 2,
  };

  console.log(product);

  export const calculatePrice = (product: Product): number => {
    return product.price * product.qty;
  };

  console.log(MyFunc.calculatePrice(product));
}