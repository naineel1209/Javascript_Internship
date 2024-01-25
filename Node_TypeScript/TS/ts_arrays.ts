//Array - container to store homogeneous elements
// const arr :number[] = [1,2,3,4,5,6];
// console.log(arr);

//using the array constructor
const arr2:string[] = new Array();
arr2.push("John");
arr2.push("Jane");
arr2.push("Jack");
arr2.push("Jill");
arr2.push("James");

console.log(arr2);

for(let a = 0; a < arr2.length; a++){
  console.log(arr2[a]);
};


///HW
const str:string[] = "Hello World".split('');
console.log(str);