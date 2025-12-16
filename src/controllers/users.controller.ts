import { Request, Response, NextFunction } from "express";
import * as service from "../services/users.service";
import { User } from "../models/user.model";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: User[] = await service.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const user: User | null = await service.getUserById(id);

        if (!user) {
            return next({ status: 404, message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email } = req.body;
        const newUser: User = await service.createUser(name, email);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;

        const updated: User | null = await service.updateUser(id, name, email);

        if (!updated) {
            return next({ status: 404, message: "Usuario no encontrado" });
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        await service.deleteUser(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};