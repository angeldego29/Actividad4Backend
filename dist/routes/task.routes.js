import { Router } from "express";
import { getTasks, getTask, postTask, patchTaskComplete, patchTaskTitle, removeTask, } from "../controllers/task.controller.js";
import { requireJson } from "../middlewares/require-json.middleware.js";
import { validateTaskId } from "../middlewares/validate-task-id.middleware.js";
import { validateTaskTitle } from "../middlewares/validate-task-title.middleware.js";
export const taskRouter = Router();
// ✅ Validación automática de todos los :id
taskRouter.param("id", validateTaskId);
// Rutas
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTask);
taskRouter.post("/", requireJson, validateTaskTitle, postTask);
taskRouter.patch("/:id/complete", patchTaskComplete);
taskRouter.patch("/:id/title", validateTaskTitle, patchTaskTitle);
taskRouter.delete("/:id", removeTask);
