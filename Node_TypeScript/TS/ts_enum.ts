//ENums - Enumerations are used to define a collection of constant values.
//

enum Directions {
    Up = "UPWARDS",
    Down = "DOWNWARDS",
    Left = "LEFTWARDS",
    Right = "RIGHTWARDS",
}

console.log(Directions.Left);
console.log(Directions.Down);
console.log(Directions.Up);
console.log(Directions.Right);

// for (let i = 0; i < 4; i++) {
//     console.log(Directions);
// }

for (let x in Directions) {
    console.log(x);
}