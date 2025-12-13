import { z } from "zod";

export const createBookingSchema = z.object({
	userId: z.number().int().positive(),
	roomId: z.number().int().positive(),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
	startTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido (HH:mm)"),
	endTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato inválido (HH:mm)")
});