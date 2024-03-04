const express = require('express')
const session = require('express-session')
const { addDays } = require('date-fns')
const { config } = require('dotenv')
const isAuthenticated = require('./middlewares/middlewares')
const path = require('path')
config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
    cookie: {
        sameSite: false,
        httpOnly: false,
        secure: false,
        expires: addDays(new Date(), 7)
    }
}))

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, "views"))

app.get('/', (req, res) => {
    res.send(`not logged in still [` + req.baseUrl + " " + req.ip + `] log in now at  - <a href="http://localhost:3000/auth/microsoft">Microsoft 🔬🍦</a> `)
})

app.use("/auth", require('./routes/auth.routes'))

app.get("/home", isAuthenticated, async (req, res) => {
    let str = `${JSON.stringify(req.session.user)}`

    str += `<br> User logged in <br>`
    str += `<br /> to Mail Servers - <a href="http://localhost:3000/mail/"> Mail to </a>`
    str += `<a href="http://localhost:3000/auth/microsoft/logout"> Sign Out </a>`
    res.send(str)
})

app.use("/mail", isAuthenticated, require('./routes/mail.routes'))

app.listen(3000, () => {
    console.log('listening on the port 3000')
})