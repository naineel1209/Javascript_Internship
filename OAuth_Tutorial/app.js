const express = require('express')
const session = require('express-session')

const app = express()

app.use(express.json())
app.use(session({
    name: "sessionID",
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}))

const microsoftConfig = {
    clientId: "847cfbf2-5fd4-422a-a511-3278d6d8b386",
    clientSecret: "1sG8Q~kT3inOSopn2wN3YB3KczexdoPfBw_BEbLy",
    authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    redirectUrl: "http://localhost:3000/auth/microsoft/callback",
    scopes: ['User.Read']
}

app.use(require('morgan')('dev'));

app.get('/', (req, res) => {
    res.send(req.baseUrl + " " + req.ip)
})

app.get('/auth/microsoft', (req, res) => {
    const redirectUrl = `${microsoftConfig.authorizationUrl}?client_id=${microsoftConfig.clientId}&response_type=code&redirect_uri=${microsoftConfig.redirectUrl}&scope=${microsoftConfig.scopes.join(' ')}`
    res.redirect(redirectUrl)
})

app.get('/auth/microsoft/callback', (req, res) => {
    const { code } = req.query

    console.log(code);
})

app.listen(3000, () => {
    console.log('listening on the port 3000')
})