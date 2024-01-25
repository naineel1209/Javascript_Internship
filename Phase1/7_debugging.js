console.log("This Is a Debugging sesh")


function callMe(){
    const salutation = `Namaste! `;
    let myName = `${salutation} Naineel Soyantar`

    return sayMyName(myName);
}

function sayMyName(name){
    return console.log(name);
}

callMe(); 

function objParameter(name){
    name.name = "Soyantar"
}

let name = {
    name: "Naineel" 
}
console.log(name)
objParameter(name);
console.log(name)