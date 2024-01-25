const delayedPromise = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 5000)
    })
}

const asyncAwait = async () => {
    const result = await delayedPromise(39);
    console.log('maroon dawg')
    console.log(result);
}

asyncAwait();