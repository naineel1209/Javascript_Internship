const express = require('express');
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MicrosoftStrategy = require('passport-microsoft').Strategy
const User = require("./models/User.js")

const app = express();


const sessionConfig = {
    secret: "secret123",
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
}
app.use(session(sessionConfig))

app.use(morgan('dev'));
app.use(passport.initialize())
app.use(passport.session())

passport.use(new MicrosoftStrategy({
    clientID: "847cfbf2-5fd4-422a-a511-3278d6d8b386",
    clientSecret: "1sG8Q~kT3inOSopn2wN3YB3KczexdoPfBw_BEbLy",
    callbackURL: "http://localhost:3000/auth/microsoft/callback",
    scope: ['User.read']
}, function (accessToken, refreshToken, profile, done) {
    console.log("accessToken ", accessToken)
    console.log("refreshToken ", refreshToken)
    console.log(profile);
    done(null, { id: profile.id })
}))

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, id)
})

app.get('/', (req, res) => {
    res.send(req.ip + " " + req.url);
});

app.get('/auth/microsoft', passport.authenticate('microsoft', {
    failureRedirect: '/auth/microsoft/error',
    successRedirect: '/home'
}))

app.get('/auth/microsoft/callback', (req, res, next) => {
    console.log('reached the callback');
    next();
}, passport.authenticate('microsoft'), (req, res) => {
    console.log("authenticated:  " + req.isAuthenticated());
    res.redirect('/home');
})

app.get('/home', (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/error')
    }
}, (req, res) => {
    res.send("home sweet home")
})

app.get('/auth/microsoft/error', (req, res) => {
    res.send('error has occured while authenticating')
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})