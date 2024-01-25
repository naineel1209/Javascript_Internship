//! 1
function timeoutPromise() {
    return new Promise((resolve, reject) => {
        console.log("Program started....")
        console.log("Program in progress")

        setTimeout(() => {
            resolve(1)
        }, 2000)
    })
}

timeoutPromise().then((res) => {
    console.log(res)
    console.log("Program finished")
})

//! 2
const rejectedPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 3000)
    setTimeout(() => reject(), 2000)
})

rejectedPromise.then((rs) => console.log("completed")).catch(err => { console.log("rejected error") })

