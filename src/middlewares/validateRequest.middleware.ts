import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: z.ZodTypeAny) =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: result.error.issues
			});
		}

		next();
	};