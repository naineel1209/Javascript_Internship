const express = require('express')
const { Client } = require('@microsoft/microsoft-graph-client')

const router = express.Router()

router.use((req, res, next) => {
    const authProvider = async (callback) => {
        callback(null, req.session.accessToken);
    }

    const clientOptions = {
        authProvider
    }

    let client = Client.initWithMiddleware(clientOptions);
    req.session.client = client

    console.log(client)

    next()
})

router.get("/", async (req, res) => {
    console.log(req.session)

    console.log(req.session.client)
})

module.exports = router