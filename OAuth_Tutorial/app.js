const express = require('express')
const session = require('express-session')
const axios = require('axios')
const { url } = require('inspector')

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

app.get('/auth/microsoft/callback', async (req, res) => {
    const { code } = req.query

    if (!code) {
        return res.send("Authentication failed")
    }

    //get the token
    try {
        const tokenResponse = await axios({
            method: 'POST',
            url: microsoftConfig.tokenUrl,
            data: {
                client_id: microsoftConfig.clientId,
                client_secret: microsoftConfig.clientSecret,
                redirect_uri: microsoftConfig.redirectUrl,
                grant_type: 'authorization_code'
            }
        })
        const response = tokenResponse.data;
        console.log(response);
    } catch (err) {
        console.log(err);
        res.send("Authentication failed")
    }
})

app.listen(3000, () => {
    console.log('listening on the port 3000')
})