import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const path = "./protos/greet_user.proto";
const packageDef = protoLoader.loadSync(path, {
    keepCase: true,
});

const greet_user = grpc.loadPackageDefinition(packageDef); //load the package

async function main() {
    //create a client to the service you want to invoke
    const client = new greet_user.GetUserService("localhost:50051", grpc.credentials.createInsecure());

    //make a request to the server by calling the service method with defined arguments
    client.getUser({ name: "Naineel", email: "naineelsoyantar@gmail.com", age: 21 }, (err, response) => {
        if (!err) {
            console.log("Greeting:", response);
        } else {
            console.error(err);
        }
    });
}


main(); //call the main function