import { Router } from "express";
import * as Rooms from "../controllers/rooms.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createRoomSchema } from "../schemas/room.schema";

const router = Router();

router.get("/", Rooms.getAllRooms);
router.get("/:id", Rooms.getRoomById);
router.post("/", validateRequest(createRoomSchema), Rooms.createRoom);
router.put("/:id", validateRequest(createRoomSchema), Rooms.updateRoom);
router.delete("/:id", Rooms.deleteRoom);

export default router;