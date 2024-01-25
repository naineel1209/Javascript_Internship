const date = new Date();

console.time("timer1")
console.log(date)
console.log(date.toISOString())
console.log(date.toUTCString())
console.timeEnd("timer1")