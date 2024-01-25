import express from 'express';
import path from 'path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import userNames from './data/usernames.json' assert { type: "json"};
import fs from 'fs/promises'
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', path.join('views'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/login', async (req, res) => {
    const { password, username } = req.body;
    const user = {
        username,
        password
    }

    if (userNames.includes(username)) {
        const accessToken = jwt.sign(user, 'nosecret123456');
        res.cookie('accessToken', accessToken, {
            httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
        })
        return res.status(200).json({ success: true, message: accessToken })
    } else {
        userNames.push(username);
        await fs.writeFile('./data/usernames.json', JSON.stringify(userNames, null, 2));
        const accessToken = jwt.sign(user, 'nosecret123456');
        res.cookie('accessToken', accessToken, {
            httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
        })
        return res.status(200).json({ success: true, message: accessToken })
    }
});

app.get('/chat', verifyToken, (req, res) => {

    res.render('landingPage', {
        user: req.user,
    })
})


function verifyToken(req, res, next) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.redirect('/');
    }

    req.user = jwt.verify(accessToken, 'nosecret123456')

    if (!req.user) {
        return res.redirect('/');
    }

    next();
}

//socket.io connections
io.on('connection', (socket) => {

    //sends a message to the user who just connected
    socket.emit('conDiscon message', "Welcome to the chat");

    // sends a message to all other users when a new user connects
    socket.broadcast.emit('conDiscon message', "A user connected");

    socket.on('disconnect', () => {
        socket.broadcast.emit('conDiscon message', "A user disconnected");
    })

    //! typing and stop typing events
    socket.on('typing', (data) => {
        if (data.room) {
            socket.to(data.room).emit('typing', data);
        } else {
            socket.broadcast.emit('typing', data);
        }
    })

    socket.on('stop typing', (data) => {
        if (data.room) {
            socket.to(data.room).emit('stop typing');
        } else {
            socket.broadcast.emit('stop typing', data);
        }
    })

    //listens for a message from the client
    socket.on('chat message', (data) => {
        const { sender, message, room } = data;
        //emit the message to all the clients
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const messageObj = {
            msg: message,
            sender: sender,
            date,
            time
        }

        if (room) {
            io.to(room).emit('server message', messageObj)
        } else {
            io.emit('server message', messageObj);
        }
    })

    socket.on('join room', (data) => {
        const { sender, receiver } = data;
        let str;
        if (userNames.includes(receiver)) {
            str = [sender, receiver].sort().join('-') + " chat-room";
        } else {
            str = receiver + " chat-room";
        }

        console.log(str);

        socket.join(str);
        socket.to(str).emit('conDiscon message', "Welcome to the chat");
        socket.emit('join room', { roomName: str, sender, receiver })
    })

    socket.on('leave room', (data) => {

    })
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})