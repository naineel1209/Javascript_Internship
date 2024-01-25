let num4: string | number = 1;
let num5: string | number = "1";

console.log(num4, num5);

num4 = "1";
num5 = 1; // this is allowed because of the union type

console.log(num4, num5);

function getDBid(): string | number {
    if (Math.random() < 0.5) {
        return 1;
    }
    else {
        return "str"

    }
}

console.log(getDBid())