const cluster = require('node:cluster');
const os = require('node:os')

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);


    cluster.fork();
    cluster.fork();
} else {
    // if (Math.random() > 0.6) {
    //     console.log(`Worker ${process.pid} started`);
    //     console.log(`Worker ${process.pid} finished`);
    // } else {}

    console.log(os.cpus().length)
    console.log(`Worker ${process.pid} started`);
    for (let j = 0; j < 1e10; j++) { }
    console.log(`Worker ${process.pid} finished`);
}