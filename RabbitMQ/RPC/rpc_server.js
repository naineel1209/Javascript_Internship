import amqp from "amqplib";

const serveExpensiveOps = async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const q = await channel.assertQueue("rpc_queue", { durable: false });
    channel.prefetch(1);

    console.log(" [x] Awaiting RPC requests");

    await channel.consume(q.queue, async (msg) => {
        const n = parseInt(msg.content.toString());

        console.log(" [.] fib(%d)", n);

        const r = fibonacci(n);

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
            correlationId: msg.properties.correlationId,
        });
    }, { noAck: true });
}

const fibonacci = (n) => {
    if (n === 0 || n === 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

serveExpensiveOps().catch(console.warn);