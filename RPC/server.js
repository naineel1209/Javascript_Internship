import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

//load the protobuf
const path = "./protos/greet_user.proto";

const packageDef = protoLoader.loadSync(path, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});


const greet_user = grpc.loadPackageDefinition(packageDef);

function getUser(call, callback) {
    console.log(call.request);
    callback(null, { greeting: "Hello " + call.request.name });
}

async function main() {
    const server = new grpc.Server();


    //add a service to the server
    server.addService(greet_user.GetUserService.service, { getUser: getUser }); //added the service
    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
        }

        console.log("server running at port", port);
    })
}

main()