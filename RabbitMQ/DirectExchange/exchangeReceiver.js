import amqp from "amqplib";

const directExchange = "directExchange";

const logTypes = process.argv.slice(2);

export const receivedirect = async () => {
    console.og
    try {
        if (logTypes.length === 0) logTypes.push("info");

        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        //assert exchange and assert queue and bind the queue to the exchange
        await channel.assertExchange(directExchange, "direct", { durable: true });

        const q = await channel.assertQueue("", { exclusive: true });

        //bind our queue to the exchange
        logTypes.forEach((logType) => {
            channel.bindQueue(q.queue, directExchange, logType);
        });

        //consume the message from the queue
        await channel.consume(q.queue, (msg) => {
            if (msg.content) {
                console.log(`[x] Received ${msg.content.toString()}`);
                channel.ack(msg);  // acknowledge the message
            }
        });
    } catch (err) {
        console.log(err);;
    }
};

receivedirect();  // call the function to consume the message from the queue