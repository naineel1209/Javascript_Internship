//! try catch and finally blocks - handle the error handling

const func = () => {
    console.time('err')
    try{
        const rand = Math.floor(Math.random()*100)
        
        if(rand > 50){
            throw new Error((JSON.stringify({msg: "error", number: rand})));
        }else{
            console.log("no error found");
        }
    }catch(err){
        console.log(JSON.parse(err.message));
    }finally{
        console.log("this will be always logged")
    }
    console.timeEnd('err')
}

func()

//! difference between errors and exceptions
// errors - lead to termination of the programs
// exceptions - happen during the runtime - reference error, typeerror - which can be handled using try-catch and finally block

// in javascript - Error object is generated for both so no worries

