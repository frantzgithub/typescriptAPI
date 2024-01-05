import { NextFunction, Request, Response } from "express";
import { userDatabase } from "./database";

export const isUserIdValid = (req: Request, res: Response, next: NextFunction) => {
    if(!userDatabase.some(user => user.id === req.params.userId)){
        return res.status(404).json({ error: "Not found any user with this id"});
    }
    return next();
}
export const isUserEmailUnique = (req: Request, res: Response, next: NextFunction) => {
    if(userDatabase.some(user => user.email === req.body.email)){
        return res.status(401).json({ error: "You cannot register a user with the same email"});
    }
    return next();
}
export const isRequestBodyValid = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.name || !req.body.email){
        return res.status(422).json({ error: "Missing body parameters"});
    }
    return next();
}