import amqplib from "amqplib";

const orderQueue = "orderQueue";

export const sendOrder = async (order) => {
    try {
        const connection = await amqplib.connect("amqp://localhost");  // connect to RabbitMQ server
        const channel = await connection.createChannel();  // create a channels

        const msgQ = await channel.assertQueue(orderQueue, { durable: true });  // create a queue
        console.log(msgQ)
        channel.sendToQueue(msgQ.queue, Buffer.from(JSON.stringify(order)), { persistent: true });  // send message to queue

        console.log(`[x] Sent ${order.id}`);  // log message to console
        setTimeout(async () => {
            await connection.close();
        }, 500)
        // close connection
    } catch (err) {
        console.log(err);
    }
}