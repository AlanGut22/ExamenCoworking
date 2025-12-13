import { Request, Response, NextFunction } from "express";
import * as service from "../services/rooms.service";
import { Room } from "../models/room.model";

export const getAllRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const rooms: Room[] = await service.getAllRooms();
		res.json(rooms)
	} catch (err) {
		next(err);
	}
}

export const getRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const id = Number(req.params.id);
		const room: Room | null = await service.getRoomById(id);

		if (!room) {
			return next({ status: 404, message: "Sala no encontrada" })
		}

		res.json(room);

	} catch (err) {
		next(err);
	}
}

export const createRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { name, capacity } = req.body;

		const newRoom: Room = await service.createRoom(name, capacity);

		res.status(201).json(newRoom);

	} catch (err) {
		next(err);
	}
}

export const updateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const id = Number(req.params.id);
		const { name, capacity } = req.body;

		const updated: Room | null = await service.updateRoom(id, name, capacity);

		if (!updated) {
			return next({ status: 404, message: "Sala no encontrada" })
		}

		res.json(updated);

	} catch (err) {
		next(err);
	}
}

export const deleteRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

	try {
		const id = Number(req.params.id);
		await service.deleteRoom(id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}