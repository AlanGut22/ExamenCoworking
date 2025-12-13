import { Router } from "express";
import * as Users from "../controllers/users.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

router.get("/", Users.getUsers);
router.get("/:id", Users.getUserById);
router.post("/", validateRequest(createUserSchema), Users.createUser);
router.put("/:id", validateRequest(createUserSchema), Users.updateUser);
router.delete("/:id", Users.deleteUser);

export default router;