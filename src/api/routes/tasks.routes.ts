import { Router } from "express";
import * as controller from "../../controlador/tasks.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, controller.createTask);
router.get("/", authMiddleware, controller.getTasks);
router.get("/:id", authMiddleware, controller.getTask);
router.put("/:id", authMiddleware, controller.updateTask);
router.delete("/:id", authMiddleware, controller.deleteTask);

export default router;