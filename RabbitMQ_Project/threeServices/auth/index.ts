import express, { NextFunction, Response } from "express";
import mongoose from "mongoose";
import "express-async-errors";
import User from "./models/User";
import jwt from "jsonwebtoken";

type CustomError = Error & {
    status: CustomError
}

const PORT: number = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error("401:user already exists");
    } else {
        const user = new User({
            email,
            name,
            password
        })
        await user.save();

        return res.status(201).json({
            message: 'user created',
            'user-id': user._id,
        })
    }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("404:User not found");
    } else {
        if (password !== user.password) {
            throw new Error("401:Unauthorized");
        }

        const payload = {
            email,
            name: user.name
        }

        const accessToken = jwt.sign(payload, "secret12345");
        return res.json({ token: accessToken })
    }
})


app.use("*", async (req, res) => {
    throw new Error("404:page deoesn't exist");
})

app.use((err: Error, req: Express.Request, res: Response, next: NextFunction) => {
    const [status, message] = err.message.split(":");
    return res.status(Number(status)).json({ message });
})


async function start() {
    await mongoose.connect("mongodb+srv://naineelsoyantar:1234567890@cluster0.uuaqzii.mongodb.net/authServices");

    console.log("mongoose connected!!");

    app.listen(PORT, () => {
        console.log('listening to the server - auth at port ' + PORT);
    })
}

start();
