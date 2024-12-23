import amqplib from "amqplib";

const firstQueue = "firstQueue";
const message = "firstMessage";

const sendMsg = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");  // connect to RabbitMQ server
        const channel = await connection.createChannel();  // create a channels

        const msgQ = await channel.assertQueue(firstQueue, { durable: true });  // create a queue
        console.log(msgQ)
        channel.sendToQueue(msgQ.queue, Buffer.from(message), { persistent: true });  // send message to queue

        console.log(`[x] Sent ${message}`);  // log message to console
        setTimeout(async () => {
            await connection.close();
        }, 500)
        // close connection
    } catch (err) {
        console.log(err);
    }
};

sendMsg();  // call sendMsg function