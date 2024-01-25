//! generators functions - syntactic sugar to create iterators


let customRange = {

    //! Iterator using normal way
    // [Symbol.iterator]() { // called for initalization of for..of
    //     i = 0;
    //     return {
    //         next() { // called everytime for iteration
    //             if (i++ < 10) {
    //                 return {
    //                     value: Math.floor(Math.random() * 100),
    //                     done: false
    //                 }
    //             } else {
    //                 return {
    //                     done: true
    //                 }
    //             }
    //         }
    //     }
    // }

    //! Iterator using generators
    [Symbol.iterator]: function* () {
        for (let i = 0; i < 10; i++) {
            yield Math.floor(Math.random() * 100);
        } //! no need of unnecessary return statements and objects and next functions
    }
}

for (let val of customRange) {
    console.log(val)
}