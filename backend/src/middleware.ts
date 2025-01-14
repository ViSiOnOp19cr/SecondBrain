import jwt  from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "./config";
import {NextFunction, Request, Response } from "express";
export const usermiddlewares = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const decoded = jwt.verify(header as string, JWT_USER_PASSWORD);
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}