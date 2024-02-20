const arrayBuffer = new ArrayBuffer(64);
const blob = new Blob([arrayBuffer]);
console.log(blob);
console.log(blob.type);

//ArrayBuffer to Buffer
console.log(arrayBuffer);
const buffer = Buffer.from(arrayBuffer);
console.log(buffer);


//ArrayBuffer to String
const str = new TextDecoder().decode(arrayBuffer);
console.log(str);
console.log(str);
console.log(str);