import jwt from "jsonwebtoken"

export async function isAuthenticated(req, res, next) {
    try {    //Bearer <token>
        const token = req.headers['Authorization'].split(" ")[1];

        const user = await jwt.verify(token, 'secret12345');


        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            message: "not registered"
        })
    }
}