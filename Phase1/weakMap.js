let john = {
    name: 'John'
}

const weakMap = new WeakMap();
weakMap.set(john, "xyz");
let i = 1;
while (weakMap.has(john)) {
    if (i == 10000) john = null;


    console.log(weakMap.get(john), i++);
}