import { z } from "zod";

export const createBookingSchema = z.object({
	user_id: z.number().int().positive("Usuario inválido"),
	room_id: z.number().int().positive("Sala inválida"),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
	start_time: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido (HH:mm)"),
	end_time: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido (HH:mm)")
});