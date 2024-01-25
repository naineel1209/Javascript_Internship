function loadScript(src) {
    return new Promise(function (resolve, reject) {
        let script = document.createElement('script')
        script.src = src;

        script.onload(() => {
            resolve(script)
        })

        script.onerror(() => {
            reject(new Error("Some kind of error occured"))
        })

        document.head.append(script)
    })
}

let promise = loadScript(`https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js`);

promise.then((data) => {
    console.log("Script has been loaded")

    console.log(data);
}).catch(err => {
    console.log("some kind of error occured")
})