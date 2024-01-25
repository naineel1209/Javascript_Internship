//! won't work in node
function promiseBasedTimeout(delay) {
    return new Promise(function (resolve, reject) {
        const startTime = new Date().getTime()

        const checkTime = () => {
            const currTime = new Date().getTime()

            if ((currTime - startTime) >= delay) {
                resolve();
            } else {
                requestAnimationFrame(checkTime);
            }
        }

        requestAnimationFrame(checkTime);
    })
}

promiseBasedTimeout(3000).then(() => {
    console.log('this was logged after 3000 seconds')
})