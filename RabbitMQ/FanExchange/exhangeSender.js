import amqp from "amqplib";

const fanoutExchange = "fanoutExchange";
const fanoutQueue = "fanoutQueue";
const fanoutQueue2 = "fanoutQueue2";

const message = "Hello World";

export const sendFanout = async (msg = message) => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        //assert exchange and publish message to the exchange
        await channel.assertExchange(fanoutExchange, "fanout", { durable: true });

        //below publishes the message to the exchange with the routing key as empty string for fanout exchange
        channel.publish(fanoutExchange, "", Buffer.from(msg));

        console.log(`[x] Sent ${msg}`);

        setTimeout(async () => {
            await connection.close();
        }, 500);
    } catch (err) {
        console.log(err);;
    }
};

sendFanout();  // call the function to send the message to the exchange