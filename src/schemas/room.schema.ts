import { z } from "zod";

export const createRoomSchema = z.object({
	name: z.string().min(2, "El nombre es obligatorio"),
	capacity: z.number().int().positive("La capacidad debe ser mayor a 0")
});