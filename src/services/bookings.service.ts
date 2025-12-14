import pool from "../config/db";
import { Booking } from "../models/booking.model";
import { formatDate } from "../utils/data.utils";

export const getAllBookings = async (): Promise<Booking[]> => {
	const [booking] = await pool.query("SELECT * FROM bookings");
	return (booking as Booking[]).map(b => ({ ...b, date: formatDate(b.date) }));
}

export const getBookingById = async (id: number): Promise<Booking | null> => {
	const [booking] = await pool.query("SELECT * FROM bookings WHERE id = ?", [id]);
	return (booking as Booking[])[0] || null;
}

export const getBookingsByRoomId = async (roomId: number): Promise<Booking[]> => {
	const [room]: any = await pool.query("SELECT id FROM rooms WHERE id = ?", [roomId]);

	if (room.length === 0) {
		throw { status: 404, message: "La sala no existe" };
	}

	const [bookings] = await pool.query("SELECT * FROM bookings WHERE room_id = ?", [roomId]);

	return (bookings as Booking[]).map(b => ({ ...b, date: formatDate(b.date) }));
}

export const createBooking = async (userId: number, roomId: number, date: string, startTime: string, endTime: string): Promise<Booking> => {

	if (endTime <= startTime) {
		throw { status: 400, message: "La hora de fin debe ser mayor a la hora de inicio" };
	}

	const today = new Date().toISOString().split("T")[0];

	if (date < today) {
		throw { status: 400, message: "No se pueden crear reservas en fechas pasadas" };
	}

	const [user]: any = await pool.query("SELECT id FROM users WHERE id = ?", [userId]);

	if (user.length === 0) {
		throw { status: 404, message: "El usuario no existe" };
	}

	const [room]: any = await pool.query("SELECT id FROM rooms WHERE id = ?", [roomId]);

	if (room.length === 0) {
		throw { status: 404, message: "La sala no existe" };
	}

	const [userBookings]: any = await pool.query("SELECT COUNT(*) as total FROM bookings WHERE user_id = ? AND date = ?", [userId, date]);

	if (userBookings[0].total >= 2) {
		throw { status: 400, message: "El usuario ya tiene el máximo de reservas para este día" }
	}

	const [overlap]: any = await pool.query("SELECT id FROM bookings WHERE room_id = ? AND date = ? AND ((? < end_time AND ? > start_time))", [roomId, date, startTime, endTime]);

	if (overlap.length > 0) {
		throw { status: 400, message: "La sala ya tiene una reserva en ese horario" };
	}

	const [result]: any = await pool.query("INSERT INTO bookings (user_id, room_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)", [userId, roomId, date, startTime, endTime]);

	return { id: result.insertId, user_id: userId, room_id: roomId, date, start_time: startTime, end_time: endTime, created_at: new Date().toISOString() }
}

export const deleteBooking = async (id: number): Promise<void> => {
	await pool.query("DELETE FROM bookings WHERE id = ?", [id]);
}