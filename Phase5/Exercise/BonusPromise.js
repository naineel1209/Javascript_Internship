const prom1 = new Promise((res) => {
    setTimeout(() => {
        res(10)
    }, 2000)
})

const prom2 = new Promise((res) => {
    setTimeout(() => {
        res(20);
    }, 5000)
})

Promise.all([prom1, prom2]).then(vals => {
    console.log(vals.reduce((a, curr) => {
        return a + curr;
    }))
})