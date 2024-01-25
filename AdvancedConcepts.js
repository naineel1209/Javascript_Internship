function scheduleWork() {
    Promise.resolve().then(() => console.log('Microtask 1')); //first
    Promise.resolve().then(() => console.log('Microtask 2')); //second

    setTimeout(() => console.log('Timeout 1'), 0); //third
    setTimeout(() => {
        console.log('Timeout 2'); //fourth
        setImmediate(() => console.log('Immediate 1')); // goes to event loop and is executed after the timeout 2
        Promise.resolve().then(() => console.log('Microtask 3')); // fifth
        Promise.resolve().then(() => console.log('Microtask 4')); // sixth
    }, 0);
    setTimeout(() => console.log('Timeout 3'), 0); //seventh

}

scheduleWork();