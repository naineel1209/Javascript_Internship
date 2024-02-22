import amqp from "amqplib";

const fanoutExchange = "fanoutExchange";

export const receiveFanout = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        //assert exchange and assert queue and bind the queue to the exchange
        await channel.assertExchange(fanoutExchange, "fanout", { durable: true });

        const q = await channel.assertQueue("", { exclusive: true });

        //bind our queue to the exchange
        channel.bindQueue(q.queue, fanoutExchange, "");

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

receiveFanout();  // call the function to consume the message from the queue