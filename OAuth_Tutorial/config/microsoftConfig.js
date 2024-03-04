const { config } = require('dotenv')
config()


module.exports = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    redirectUrl: "http://localhost:3000/auth/microsoft/callback",
    scopes: ['User.Read', 'Mail.Read', 'Mail.Send', 'Mail.Send.Shared', 'Mail.ReadWrite', 'offline_access'],
    state: process.env.STATE,
    graphHitUrl: 'https://graph.microsoft.com/v1.0/me'
}