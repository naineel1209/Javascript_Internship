import amqp from 'amqplib';

const exchange = 'direct_logs';

const sendLogs = async (message: string, logType: string) => {
    // Connect to RabbitMQ server and create a channel for transfer
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    //assert a queue
    const dExchange = await channel.assertExchange(exchange, "direct", {
        durable: true
    });


    //now take the message and publish to the exchange and let it handle
    channel.publish(dExchange.exchange, logType, Buffer.from(message), {
        persistent: true
    });

    console.log(`Sent ${logType}: ${message}`);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendLogs("message123", "error");