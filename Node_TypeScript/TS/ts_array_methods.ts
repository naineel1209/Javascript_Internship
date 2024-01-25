const arr:number[] = [1,2,3,4,5,6,7,8,9,10];

//for loop
for(let a = 0; a < arr.length; a++){
  console.log(arr[a]);
};
console.log("---------------------------------")
//for in loop
for(let index in arr){
  console.log(index, arr[index]);
}
console.log("---------------------------------")
//for..of loop
for(let item of arr){
  console.log(item);
}
console.log("---------------------------------")
//forEach loop 
arr.forEach((item, idx) => {
  console.log(item, idx);
})

//map
const newArr = arr.map((item, idx) => {
  return item * 2;
})

//filter 
const filteredArr = arr.filter((item, idx) => {
  return item % 2 == 0;
})

//reduce
const accVal = arr.reduce((acc, item, idx) : number => {
  return acc + item;
})