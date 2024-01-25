//! as the name suggests - it is used to generate iterators 
const maroon = ["elephant", "lion", "tiger", "giraffe", "monkey", "kangaroo", "polar bear", "rhino", "zebra", "hippo",];

let range = {
    from: 1,
    to: 9,

    [Symbol.iterator]: function () { // called once, in the beginning of for..of
        return {
            current: this.from,
            last: this.to,

            next() { // called every iteration, to get the next value
                if (this.current <= this.last) {
                    return { done: false, value: maroon[this.current++] };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

let customRange = {
    [Symbol.iterator]() { // called for initalization of for..of
        i = 0;
        return {
            next() { // called everytime for iteration
                if (i++ < 10) {
                    return {
                        value: Math.floor(Math.random() * 100),
                        done: false
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }
}

let iterObj = {
    [Symbol.iterator]: () => {
        return {
            next: () => {
                const num = Math.random();

                if (num > 0.75) {
                    //stop
                    return {
                        done: true
                    }
                } else {
                    //go to next but give current value
                    return {
                        value: Math.floor(num * 100),
                        done: false,
                    }
                }
            }
        }
    }
}


// for (let value of iterObj) {
//     console.log(value); // 1 then 2, then 3, then 4, then 5
// }

for (let value of customRange) {
    console.log(value)
}