import express, { NextFunction, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { isAuthenticated } from "../isAuthenticated";
import amqp from "amqplib";
import Product from "./models/Product";
import { JwtPayload } from "jsonwebtoken";

let connection: amqp.Connection, channel: amqp.Channel, order: any;

const PORT: number = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// app.use(isAuthenticated)

//create a product
app.post("/products/create", isAuthenticated, async (req, res) => {
    const { name, description, price } = req.body;
    const product = new Product({
        name, description, price
    });
    await product.save();


    return res.status(201).json({ product });
});

//get all products
app.get("/products", async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({ products });
});

//user sends a request with ids of products to buy
app.post("/products/buy", isAuthenticated, async (req, res) => {
    const { productIds } = req.body;
    const products = await Product.find({ _id: { $in: productIds } });

    const total = products.reduce((acc, product) => {
        if (product.price) {
            return acc + product.price;
        }
        return acc;
    }, 0);

    //send to product service
    await channel.sendToQueue("ORDER_Q", Buffer.from(JSON.stringify({ products, total, userEmail: (req.user as JwtPayload).email })));

    //receive from order service
    await channel.consume("PRODUCT_Q", async (data) => {
        if (data === null) return;
        order = JSON.parse(data.content.toString());
        channel.ack(data);
    })

    return res.status(200).json({ order });
});

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

    await channel.assertQueue("PRODUCT_Q", { durable: false });
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
