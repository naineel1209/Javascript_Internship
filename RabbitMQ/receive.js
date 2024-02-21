import amqplib from "amqplib";

const firstQueue = "firstQueue";

const rcvMsg = async () => {
    const connection = await amqplib.connect("amqp://localhost");  // connect to RabbitMQ server
    const channel = await connection.createChannel();  // create a channels

    const msgQ = await channel.assertQueue(firstQueue, { durable: true });  // create a queue
    console.log(msgQ)
    console.log(`[*] Waiting for messages in ${firstQueue}. To exit press CTRL+C`);  // log message to console

    channel.consume(firstQueue, (msg) => {  // consume message from queue}
        console.log(`[x] Received ${msg.content.toString()}`);  // log message to console
        channel.ack(msg)
    });
}

rcvMsg();  // call rcvMsg function