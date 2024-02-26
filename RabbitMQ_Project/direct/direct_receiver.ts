import amqp from "amqplib";

const exchange = "direct_logs";
const logTypes = process.argv.slice(2);
console.log(logTypes);

const receiveLogs = async () => {
    //connect to the server
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    //assertExchange - 
    const dExchange = await channel.assertExchange(exchange, "direct", {
        durable: true
    });

    const q = await channel.assertQueue("", {
        durable: true
    });

    for (let item of logTypes) {
        channel.bindQueue(q.queue, dExchange.exchange, item);
    }

    await channel.consume(q.queue, (msg) => {
        let m;
        if (m = msg?.content.toString()) {
            console.log(m);
        }
        if (msg)
            channel.ack(msg);
    })
}


receiveLogs();