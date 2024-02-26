import express, { NextFunction, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { isAuthenticated } from "../isAuthenticated";
import amqp from "amqplib";
import Order from "./models/Order";

let connection: amqp.Connection, channel: amqp.Channel;

const PORT: number = 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.use("*", async (req, res) => {
    throw new Error("404:page deoesn't exist");
})

app.use((err: Error, req: Express.Request, res: Response, next: NextFunction) => {
    const [status, message] = err.message.split(":");
    return res.status(Number(status)).json({ message });
})


async function connectAmqp() {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue("ORDER_Q", { durable: false });
}
connectAmqp().then(async () => {
    await channel.consume("ORDER_Q", async (data) => {
        if (data === null) return;
        const { products, total, userEmail } = JSON.parse(data.content.toString());
        const order = new Order({
            products, total_price: total, user: userEmail
        });
        await order.save();

        channel.ack(data);
        channel.sendToQueue("PRODUCT_Q", Buffer.from(JSON.stringify(order)), {
        });
    });
});

async function start() {
    await mongoose.connect("mongodb+srv://naineelsoyantar:1234567890@cluster0.uuaqzii.mongodb.net/orderService");
    console.log("mongoose connected!!");

    app.listen(PORT, () => {
        console.log('listening to the server - product at port ' + PORT);
    })
}

start();
