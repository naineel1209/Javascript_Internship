import express, { NextFunction, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { isAuthenticated } from "../isAuthenticated";
import amqp from "amqplib";

let connection: amqp.Connection, channel: amqp.Channel;

const PORT: number = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// app.use(isAuthenticated)

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

    const q = await channel.assertQueue("PRODUCT_Q", { durable: false });


}
connectAmqp();


async function start() {
    await mongoose.connect("mongodb+srv://naineelsoyantar:1234567890@cluster0.uuaqzii.mongodb.net/productService");
    console.log("mongoose connected!!");

    app.listen(PORT, () => {
        console.log('listening to the server - product at port ' + PORT);
    })
}

start();
