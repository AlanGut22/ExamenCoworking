import { pool } from "../config/db";
import { User } from "../models/user.model";

export const getAllUsers = async (): Promise<User[]> => {
	const [user] = await pool.query("SELECT * FROM users");
	return user as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
	const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
	return (user as User[])[0] || null;
};

export const createUser = async (name: string, email: string): Promise<User> => {
	const [result]: any = await pool.query(
		"INSERT INTO users (name, email) VALUES (?, ?)",
		[name, email]
	);

	return {
		id: result.insertId, name, email, created_at: new Date().toISOString()
	};
};

export const updateUser = async (id: number, name: string, email: string): Promise<User | null> => {
	await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);

	return getUserById(id);
};

export const deleteUser = async (id: number): Promise<void> => {
	await pool.query("DELETE FROM users WHERE id = ?", [id]);
};