import amqp from "amqplib";
import { v4 as uuid } from "uuid";

const getExpensiveOps = async (uuid) => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "rpc_queue";
    const msg = 20;

    const replyQueue = await channel.assertQueue("", { exclusive: true });

    channel.sendToQueue(queue, Buffer.from(msg.toString()), {
        replyTo: replyQueue.queue,
        correlationId: uuid,
    });

    return await new Promise(async (resolve) => {
        await channel.consume(replyQueue.queue, (msg) => {
            if (msg.properties.correlationId === uuid) {
                resolve(msg.content.toString());
            }
        }, { noAck: true });
    });
}


console.log(" [x] Requesting expensive operations");
getExpensiveOps(uuid()).then((response) => {
    console.log(" [.] Got %s", response);
});