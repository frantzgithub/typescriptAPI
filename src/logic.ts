import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { userDatabase } from "./database";
import { IUser } from "./interfaces";

export const getOneUser = (req: Request, res: Response) => {
    const user = userDatabase.find(user => user.id === req.params.userId);

    return res.status(200).json(user);
}

export const getUsers = (req: Request, res: Response) => {
    return res.status(200).json(userDatabase)
}

export const createUser = (req: Request, res: Response) => {
    const newUser = { id: uuidv4(), name: req.body.name, email: req.body.email };

    userDatabase.push(newUser);

    return res.status(201).json({ message: "User sucessfully created", user: newUser })
}

export const deleteUser = (req: Request, res: Response) => {
    const index = userDatabase.findIndex(user => user.id === req.params.userId);

    userDatabase.splice(index, 1);

    return res.status(200).json({ message: "User sucessfully deleted"});
}
export const updateUser = (req: Request, res: Response) => {
    const index = userDatabase.findIndex(user => user.id === req.params.userId);

    const newUser = { id: req.params.userId, name: req.body.name, email: req.body.email };

    userDatabase.splice(index, 1, newUser);

    return res.status(200).json({ message: "User updated sucessfully", user: newUser});
}

export const updatePartialUser = (req: Request, res: Response) => {
    const user = userDatabase.find(user => user.id === req.params.userId);

    let userBody: Partial<IUser> = {};

    Object.entries(req.body).forEach((entries) => {
        const [key, value] = entries;
        if(key === "name" || key === "email"){
            userBody[key] = value as string;
        }
    })

    const newUser = { ...user, ...userBody };

    const index = userDatabase.findIndex(user => user.id === req.params.userId);

    userDatabase.splice(index, 1, newUser as IUser);

    return res.status(200).json({ message: "User updated sucessfully", user: newUser});
}