const express = require('express')
const { Client } = require('@microsoft/microsoft-graph-client')

const router = express.Router({ mergeParams: true })

async function getMails(client) {
    return await client.api("/me/messages").get().then(res => res.value);
}

async function prepareMailBody(body) {
    const mailBody = {}

    mailBody.subject = body.subject
    mailBody.body = {
        contentType: body.bodyType.toUpperCase(),
        content: body.body
    }
    mailBody.toRecipients = body.recipients.split(",").map(elem => {
        return {
            emailAddress: {
                address: elem.trim()
            }
        }
    })

    return mailBody
}

router.use((req, res, next) => {

    const authProvider = async (callback) => {
        callback(null, `${req.session.accessToken}`); //just give the access token to the client - they will be happy
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
    const mails = await getMails(req.session.client)

    res.render('mail-index', { user: req.session.user, mails })
})

router.get("/send", async (req, res) => {
    res.render("send-mail")
}).post("/send", async (req, res) => {
    const mailBody = await prepareMailBody(req.body)


    try {
        await req.session.client.api("/me/sendMail").post({
            message: mailBody
        })
        res.send("done")
    } catch (err) {
        console.log(err);
    }
})

module.exports = router