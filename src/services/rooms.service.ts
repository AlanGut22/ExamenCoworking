import { pool } from "../config/db";
import { Room } from "../models/room.model";

export const getAllRooms = async (): Promise<Room[]> => {
	const [room] = await pool.query("SELECT * FROM rooms")
	return room as Room[];
}

export const getRoomById = async (id: number): Promise<Room | null> => {
	const [room] = await pool.query("SELECT *FROM rooms WHERE id = ?", [id]);
	return (room as Room[])[0] || null;
}

export const createRoom = async (name: string, capacity: number): Promise<Room> => {
	const [result]: any = await pool.query("INSERT INTO rooms (name, capacity) VALUES (?, ?)", [name, capacity]);

	return { id: result.insertId, name, capacity, created_at: new Date().toISOString() }
}

export const updateRoom = async (id: number, name: string, capacity: number): Promise<Room | null> => {
	await pool.query("UPDATE rooms SET name = ?, capacity = ? WHERE id = ?",
		[name, capacity, id]
	);

	return getRoomById(id);
}

export const deleteRoom = async (id: number): Promise<void> => {
	await pool.query("DELETE FROM rooms WHERE id= ?", [id]);
}