const express = require('express')
const { Client } = require('@microsoft/microsoft-graph-client')

const router = express.Router({ mergeParams: true })

function

    router.use((req, res, next) => {
        const authProvider = async (callback) => {
            callback(null, req.session.accessToken); //just give the access token to the client - they will be happy
        }

        const clientOptions = {
            authProvider
        }

        let client = Client.init(clientOptions);
        req.session.client = client

        next()
    })

router.get("/", async (req, res) => {
    //fetching the mails
    const mails = await fetchMails(req.session.client)

    res.render('mail-index', { user: req.session.user })
})

module.exports = router