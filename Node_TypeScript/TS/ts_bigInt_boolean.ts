//!boolean - true or false values
const isSunday : boolean = true;


//!bigInt - larger integers than the number type can hold
const bigNum :bigint = 100n;

console.log(isSunday, bigNum);

//check even nos.
const num :number = 10;
const evenNum :boolean = (num % 2) === 0;
console.log(evenNum);

//is divisible by 4 , 8 or both
const isDivisibleBy48 = (num :number) :boolean => {
  if(num % 4 === 0 && num % 8 === 0){
    return true;
  }else if(num % 4 === 0){
    return true;
  }else if(num % 8 === 0){
    return true;
  }else {
    return false;
  }
}

console.log(isDivisibleBy48(16));

//! BigInt 
const num2 :bigint = 9007199254740991n;
const num3 :bigint = 9007199254740992n;

const anotherSum :bigint = num2 + num3;
console.log((anotherSum));
console.log(String(anotherSum));
