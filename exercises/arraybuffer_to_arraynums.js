const arrayBuff = new ArrayBuffer(64);
const uint8 = new Uint8Array(arrayBuff);
const arr = Array.from(uint8);
uint8[0] = 257; // not a valid value for a Uint8Array (0-255) so it will be truncated to 0 (257 % 256 = 1) 


console.log(arrayBuff)
console.log(uint8)
console.log(arr)
console.log(uint8.length);

