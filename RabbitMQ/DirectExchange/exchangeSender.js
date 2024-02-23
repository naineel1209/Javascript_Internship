import amqp from "amqplib";

const directExchange = "directExchange";
const directQueue = "directQueue";
const directQueue2 = "directQueue2";

const message = "Hello World";

export const senddirect = async (logType, msg = message) => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        //assert exchange and publish message to the exchange
        await channel.assertExchange(directExchange, "direct", { durable: true });

        //below publishes the message to the exchange with the routing key as empty string for direct exchange
        channel.publish(directExchange, logType, Buffer.from(msg));

        console.log(`[x] Sent ${msg}`);

        setTimeout(async () => {
            await connection.close();
        }, 500);
    } catch (err) {
        console.log(err);;
    }
};

senddirect("info");  // call the function to send the message to the exchange