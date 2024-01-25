console.log("Program started!!")

const prom1 = new Promise((res, rej) => {
    setTimeout(() => res({ data: "Hello, friends!!!", error: null }), 5000)
})


console.log(prom1)
console.log("Promise in progress")

prom1.then((res) => {
    console.log(res)

    return new Promise((res) => {
        setTimeout(() => {
            res("First Promise Chain is completed")
        }, 2000)
    })
}).then(res => {
    console.log(res);

    return new Promise(res => {
        setTimeout(() => {
            res("Second Promise Chain Completed")
        }, 10000)
    })
}).then(res => {
    console.log(res);
    console.log(prom1)
})