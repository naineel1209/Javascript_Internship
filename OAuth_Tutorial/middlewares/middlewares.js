const axios = require('axios')
const microsoftConfig = require('../config/microsoftConfig')

module.exports = async (req, res, next) => {
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
        //if no accesstoken
        if (err.status == 401) {
            res.redirect("/auth/microsoft/callback?refresh=true")
        }
        res.redirect("/")
    }
}