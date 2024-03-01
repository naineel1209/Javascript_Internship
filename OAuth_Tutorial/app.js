const express = require('express')
const session = require('express-session')
const axios = require('axios')
const { Client } = require('@microsoft/microsoft-graph-client')

const app = express()

app.use(express.json())
app.use(session({
    name: "sessionID",
    secret: 'secret123',
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore()
}))

const microsoftConfig = {
    clientId: "847cfbf2-5fd4-422a-a511-3278d6d8b386",
    clientSecret: "1sG8Q~kT3inOSopn2wN3YB3KczexdoPfBw_BEbLy",
    authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    redirectUrl: "http://localhost:3000/auth/microsoft/callback",
    scopes: ['User.Read', 'Mail.Read', 'offline_access'],
    state: `07d49715ad4bc2984b0e2479f95ff9a42df9900dd0029aa6423c1e21ee80865703f97684c93ef4ee9be0b911cdf9d101c00ee31fa1de4f2445027371fb5d2040`,
    graphHitUrl: 'https://graph.microsoft.com/v1.0/me'
}

const isAuthenticated = async (req, res, next) => {
    const { accessToken } = req.session;

    try {
        if (!accessToken) {
            throw new Error("Unauthorized")
        }

        if (req.session.user) {
            next()
        } else {
            const meResponse = await axios.get(`${microsoftConfig.graphHitUrl}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => res.data)

            req.session.user = {
                name: meResponse.displayName,
                firstName: meResponse.givenName,
                lastName: meResponse.surname,
                jobTitle: meResponse.jobTitle,
                mail: meResponse.mail,
                location: meResponse.location,
                id: meResponse.id
            }
            next()
        }
    } catch (err) {
        console.log(err) //if no accesstoken
        if (err.status == 401) {
            res.redirect("/auth/microsoft/callback?refresh=true")
        }
        res.redirect("/")
    }
}

app.use(require('morgan')('dev'));

app.get('/', (req, res) => {
    res.send(req.baseUrl + " " + req.ip)
})

app.get('/auth/microsoft', (req, res) => {
    const redirectUrl = `${microsoftConfig.authorizationUrl}?client_id=${microsoftConfig.clientId}&response_type=code&redirect_uri=${microsoftConfig.redirectUrl}&scope=${microsoftConfig.scopes.join(' ')}&state=${microsoftConfig.state}`
    res.redirect(redirectUrl)
})

app.get('/auth/microsoft/callback', async (req, res) => {
    const { code, state, refresh } = req.query

    try {
        if (refresh) {
            const tokenResponse = await axios.postForm(microsoftConfig.tokenUrl, {
                client_id: microsoftConfig.clientId,
                client_secret: microsoftConfig.clientSecret,
                refresh_token: req.session.refresh_token,
                redirect_uri: microsoftConfig.redirectUrl,
                grant_type: 'refresh_token',
                scope: microsoftConfig.scopes.join(' ')
            })
            const response = tokenResponse.data;
            req.session.accessToken = response["accessToken"]
            req.session.expiresIn = response["expires_in"]

            if (response["refresh_token"]) {
                req.session.refreshToken = response["refresh_token"]
            }
        } else {
            if (state != microsoftConfig.state) {
                throw new Error()
            }

            if (!code) {
                throw new Error()
            }

            //get the token
            const tokenResponse = await axios.postForm(microsoftConfig.tokenUrl, {
                client_id: microsoftConfig.clientId,
                client_secret: microsoftConfig.clientSecret,
                redirect_uri: microsoftConfig.redirectUrl,
                grant_type: `authorization_code`,
                code: `${code}`,
                scope: microsoftConfig.scopes.join(' ')
            })
            const response = tokenResponse.data;

            //setting the values inside the session
            req.session.accessToken = response["access_token"]
            req.session.expiresIn = response["expires_in"]
            if (response["refresh_token"]) {
                req.session.refreshToken = response["refresh_token"]
            }


        }
        res.redirect("/home")
    } catch (err) {
        res.send("Authentication failed")
    }
})

app.get("/auth/microsoft/logout", isAuthenticated, async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("error destroying session ", err)
            res.send('Error logging out');
        } else {
            res.redirect("/")
        }
    })
});


app.get("/home", isAuthenticated, async (req, res) => {
    let str = `${JSON.stringify(req.session.user)}`

    str += `<br> User logged in <br>`
    str += `<a href="http://localhost:3000/auth/microsoft/logout"> Sign Out </a>`
    res.send(str)
})

app.use("/mail", isAuthenticated, require('./mailRoutes'))

app.listen(3000, () => {
    console.log('listening on the port 3000')
})