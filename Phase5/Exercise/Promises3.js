//! 3
console.log("Program started")

const prom1 = new Promise((res, rej) => {
    console.log("Program in progress")

    res();

}).then(() => {
    console.log("Step 1 completed")

    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 3000)
    })
}).then(() => {
    console.log("Step 2 completed")
})
