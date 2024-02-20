import amqplib from "amqplib";

const qName = "first_queue";

const msg = "Hello World!";

const sendMsg = async () => {
    //! Connect to RabbitMQ server
    const connect = await amqplib.connect("amqp://localhost"); // amqp://localhost is the default URL for RabbitMQ server
    const channel = await connect.createChannel(); //pipeline to send or receive messages

    //! Assert a queue - assert mean - create if not exist
    const msgQ = await channel.assertQueue(qName, {
        durable: false, // if true, the queue will survive broker restarts but the message will not survive restarts
    })

    //! Send message to queue - queue.queue is the name of the queue and we need to convert the message to buffer before sending - because RabbitMQ only accepts buffer as message
    //! RabbitMQ stores messages in a queue and then delivers them to consumers. A queue is only bound by the host's memory & disk limits, it's essentially a large message buffer.
    await new Promise(async (res, rej) => {
        const bool = await channel.sendToQueue(msgQ.queue, Buffer.from(msg)); //this returns a boolean value - true if the message was sent and false if it wasn't
        if (bool) {
            console.log("Message sent to queue");
            res();
        } else {
            rej("Message not sent to queue");
        }
    });
    await connect.close(); //close the connection
    console.log("Connection closed");
}

sendMsg();