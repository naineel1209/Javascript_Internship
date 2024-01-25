function delay(i, ms) {
    return new Promise(resolve => setTimeout(() => {
        resolve(i)
    }, ms));
}


async function fun() {
    const arr = [1, 2, 3, 4, 5];
    for (var i = 0; i < arr.length; i++) {
        const ans = await delay(i, 2000)
        console.log(ans);
    }
}

async function fun1() {
    const arr = ['a1', 'a2', 'a3', 'a4', 'a5'];
    arr.forEach(async (item) => {
        const ans = await delay(item, 2000)
        console.log(ans);
    })
}

async function fun2() {
    const arr = ['a1', 'a2', 'a3', 'a4', 'a5']
    for (let item of arr) {
        const ans = await delay(item, 2000);
        console.log(ans)
    }
}

async function fun3() {
    const arr = ['a1', 'a2', 'a3', 'a4', 'a5']
    arr.map(async item => {
        const ans = await delay(item, 2000);
        console.log(ans)
    })
}

async function objFunc() {
    const arr = { '1': "killer", '2': "maroon", '3': "drive" }
    for (let item in arr) {
        const ans = await delay(arr[item], 2000);
        console.log(ans)
    }
}

process.env.UV_THREADPOOL_SIZE = 5;

objFunc();
