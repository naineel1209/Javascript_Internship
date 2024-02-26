import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user: string | JwtPayload;
        }
    }
}

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {    //Bearer <token>

        const token = (req.headers['authorization'] as string)?.split(" ")[1];
        const user = await jwt.verify(token, 'secret12345');


        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        throw new Error("401:Unauthenticated");
    }
}