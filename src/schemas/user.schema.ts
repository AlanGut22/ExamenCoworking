import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(2, "El nombre es obligatorio"),
	email: z.string().email("Correo inválido")
});