//specialized array with fixed number of elements
let tuple1: [string, number, string, number] = ["1", 2, "3", 4];
//  tuple1[0] = 2; Type '2' is not assignable to type 'string'.
tuple1[0] = "2"; // this is allowed because of the union type