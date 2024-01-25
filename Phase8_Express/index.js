const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const { checkSession, checkLoggedIn } = require('./middlewares/handlerMiddleware');
const { getUserData, setUserData } = require('./data/DataStore');


const app = express();

app.set('trust proxy', 1)
app.use(morgan('dev'));
app.use(session({
    secret: 'f83a846d3942bd38d20c82b32f946054e11d91c1191c402cb76c0d4f73fdfe5eab9e4863e0424bb60aa74d76c360c1da3d607ee3c2e69a9a8330a247839eb2b9', // random
    name: 'sessionId',
    store: new session.MemoryStore(),
    cookie: {
        maxAge: 60 * 1000, // 1 minute
    },
    resave: false,
    saveUninitialized: false
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    const sentString = `<h1>Welcome Page -> Public</h1>
<a href='/login'>Login</a> <br />
<a href='/register'>Register</a> <br />
`

    res.send(sentString)
})

app.get('/login', checkLoggedIn, (req, res) => {
    console.log(req.session)
    return res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send('Username or password is missing')
    }

    if (getUserData(username) !== password) {
        return res.redirect('/login')
    } else {
        const token = jwt.sign({ username }, 'f83a846d3942bd38d20c82b32f946054e11d91c1191c402cb76c0d4f73fdfe5eab9e4863e0424bb60aa74d76c360c1da3d607ee3c2e69a9a8330a247839eb2b9', {
            expiresIn: '2d'
        })

        req.session.user = token
        return res.redirect('/dashboard')
    }
})

app.get('/register', checkLoggedIn, (req, res) => {
    return res.render('register')
})

app.post('/register', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send('Username or password is missing')
    }

    setUserData(username, password)
    return res.redirect('/login')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    return res.redirect('/')
})

app.get('/dashboard', checkSession, (req, res) => {
    return res.render('dashboard', { user: req.session.user })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})