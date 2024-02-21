import express from "express";
import { sendOrder } from "./order_task_producer.js";
import fs from "fs";

const app = express();

const orders = [
    {
        id: 1,
        date: new Date().toLocaleDateString(),
        amount: 1000,
        status: 'Pending',
        customer: 'John Doe',
        address: '123 Main St',
        phone: '123-456-7890'
    },
    {
        id: 2,
        date: new Date('2024-01-15').toLocaleDateString(),
        amount: 1500,
        status: 'Declined',
        customer: 'Emma Johnson',
        address: '789 Oak Ln',
        phone: '555-123-7890'
    },
    {
        id: 3,
        date: new Date('2024-02-22').toLocaleDateString(),
        amount: 250,
        status: 'Completed',
        customer: 'David Lee',
        address: '101 Maple Dr',
        phone: '111-222-3333'
    },
    {
        id: 4,
        date: new Date('2024-03-08').toLocaleDateString(),
        amount: 700,
        status: 'Processing',
        customer: 'Oliver Brown',
        address: '234 Pine Blvd',
        phone: '765-432-1234'
    },
    {
        id: 5,
        date: new Date('2024-04-15').toLocaleDateString(),
        amount: 300,
        status: 'Refund Requested',
        customer: 'Ava Miller',
        address: '567 Spruce Terrace',
        phone: '888-999-0000'
    },
    {
        id: 6,
        date: new Date('2024-05-01').toLocaleDateString(),
        amount: 1200,
        status: 'Shipped',
        customer: 'William Davis',
        address: '345 Fir Lane',
        phone: '222-333-4444'
    },
    {
        id: 7,
        date: new Date('2024-05-15').toLocaleDateString(),
        amount: 450,
        status: 'Return Initiated',
        customer: 'Ellen Cooper',
        address: '678 Birch Cir',
        phone: '333-555-6666'
    },
    {
        id: 8,
        date: new Date('2024 -06 -01').toLocaleDateString(),
        amount: 800,
        status: 'Delivered',
        customer: 'Samantha Thomas',
        address: '910 Ash St',
        phone: '444 -777 -8888'
    },
    {
        id: 9,
        date: new Date('2024 -06 -15').toLocaleDateString(),
        amount: 1800,
        status: 'Canceled',
        customer: 'Charlie Parker',
        address: '123 Fourth St Apt #4B',
        phone: '555 -111 -2222'
    },
    {
        id: 10,
        date: new Date('2024 -07 -01').toLocaleDateString(),
        amount: 600,
        status: 'Paid',
        customer: 'Alexander King',
        address: '789 Tenth Ave',
        phone: '666 -999 -0000'
    }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to the Order Service");
});


app.get("/product/:id", async (req, res) => {
    const order = orders.find(order => order.id === parseInt(req.params.id));
    if (!order) res.status(404).send("Order not found");
    order.fileName = `invoice_${order.id}_${Math.random().toString().slice(-5)}.pdf`;
    //generate the invoice by dumping the order details to producer
    await sendOrder(order);

    res.send("generated invoice for order " + order.id + " \n check the invoice at " + ` <a href="/download/${order.fileName}">${order.fileName}</a> `);
});

app.get("/download/:id", async (req, res) => {
    const fileName = req.params.id;


    const file = fs.createReadStream(`./invoices/${fileName}`);
    file.pipe(res);

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf');
    return res.status(200);
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});