import { Request, Response, NextFunction } from "express";
import * as service from "../services/bookings.service";
import { Booking } from "../models/booking.model";

export const getAllBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const bookings: Booking[] = await service.getAllBookings();
		res.json(bookings);
	} catch (err) {
		next(err);
	}
}

export const getBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const id = parseInt(req.params.id);
		const booking: Booking | null = await service.getBookingById(id);

		if (!booking) {
			return next({ status: 404, message: "Reserva no encontrada" });
		}

		res.json(booking);

	} catch (err) {
		next(err);
	}
}

export const getBookingsByRoomId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const roomId = parseInt(req.params.id);
		const bookings = await service.getBookingsByRoomId(roomId);
		res.json(bookings);
	} catch (err) {
		next(err);
	}
};

export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { user_id, room_id, date, start_time, end_time } = req.body;

		const booking: Booking = await service.createBooking(user_id, room_id, date, start_time, end_time);

		res.status(201).json(booking);
	} catch (err) {
		next(err);
	}
}

export const deleteBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const id = parseInt(req.params.id);
		await service.deleteBooking(id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}