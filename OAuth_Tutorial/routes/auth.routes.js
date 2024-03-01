const { Router } = require('express');
const axios = require('axios')
const isAuthenticated = require('../middlewares/middlewares')
const microsoftConfig = require('../config/microsoftConfig')

const router = Router({ mergeParams: true })

router.get('/microsoft', (req, res) => {
    const redirectUrl = `${microsoftConfig.authorizationUrl}?client_id=${microsoftConfig.clientId}&response_type=code&redirect_uri=${microsoftConfig.redirectUrl}&scope=${microsoftConfig.scopes.join(' ')}&state=${microsoftConfig.state}`
    res.redirect(redirectUrl)
})

router.get('/microsoft/callback', async (req, res) => {
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

            //setting the access token and the refresh token in the session object
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

            //setting the values inside the session
            const response = tokenResponse.data;
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

router.get("/microsoft/logout", isAuthenticated, async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send('Error logging out');
        } else {
            res.redirect("/")
        }
    })
});

module.exports = router