import amqplib from "amqplib";
import { generateInvoice } from "./order_invoice/invoice_generator_boiler.js";

const orderQueue = "orderQueue";

export const generateOrder = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");  // connect to RabbitMQ server
        const channel = await connection.createChannel();  // create a channels

        const msgQ = await channel.assertQueue(orderQueue, { durable: true });  // create a queue
        console.log(msgQ)

        await channel.consume(msgQ.queue, async (msg) => {
            const order = JSON.parse(msg.content.toString());

            console.log(`[x] Received ${order.id}`);  // log message to console

            const storedFile = await generateInvoice(order);

            console.log(`[x] Invoice generated for order ${order.id} at ${storedFile}`);  // log message to console
        })
    } catch (err) {
        console.log(err);
    }
}

generateOrder();  // call the function to consume the message from the queue