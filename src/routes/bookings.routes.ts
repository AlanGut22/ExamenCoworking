import { Router } from "express";
import * as Booking from "../controllers/bookings.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createBookingSchema } from "../schemas/booking.schema";

const router = Router();

router.get("/", Booking.getAllBookings);
router.get("/room/:id", Booking.getBookingsByRoom);
router.get("/:id", Booking.getBookingById);
router.post("/", validateRequest(createBookingSchema), Booking.createBooking);
router.delete("/:id", Booking.deleteBooking);

export default router;