const jwt = require('jsonwebtoken')

const checkSession = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

const checkLoggedIn = (req, res, next) => {

    const token = req.session.user;
    if (!token) {
        return next();
    }

    if (jwt.verify(token, 'f83a846d3942bd38d20c82b32f946054e11d91c1191c402cb76c0d4f73fdfe5eab9e4863e0424bb60aa74d76c360c1da3d607ee3c2e69a9a8330a247839eb2b9')) {
        return res.redirect('/dashboard')
    } else {
        next();
    }

}

module.exports = {
    checkSession,
    checkLoggedIn
}