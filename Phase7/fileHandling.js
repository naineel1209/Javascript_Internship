const fs = require('fs')

// fs.open('./sample.txt', 'r', (err, fd) => {
//     if (err) {
//         console.log(err.message)
//     }

//     console.log(fd)
//     let buffer = Buffer.alloc(10240)
//     fs.read(fd, buffer, 0, 10240, 0, (err, bytesRead, buffer) => {
//         if (err) {
//             console.log(err.message)
//         }

//         console.log(bytesRead)
//         console.log(buffer.toString())
//     })
// })


// fs.readFile('./sample.txt', (err, data) => {
//     if (err) {
//         console.log(err.message)
//     }

//     console.log(data.length)
//     console.log(data.toString())
// })


fs.watchFile('./sample.txt', (curr, prev) => {
    console.log(curr)
    console.log(prev)
}, {
    BigInt: false,
})

fs.appendFile('./sample.txt', "\n The quick brown fox jumps over the lazy dog", (err) => {
    if (err) {
        console.log(err.message)
    }
})