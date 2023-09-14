import { Router } from "express";
import { ctrlDeleteTask, ctrlGetTask, ctrlUpdateTask, ctrlView, ctrlcreateTask } from "../controllers/task.controllers.js";
import { createTaskSchema, editTaskSchema } from "../models/schemas/task.schema.js";
import { validator } from "../middlewares/validator.js";

const taskRouter = Router();

//ruta para la vista
taskRouter.get("/tasks", ctrlView)

// endpoint para traer todas las publicaciones
taskRouter.get("/api/tasks", ctrlGetTask)

// endpoint para crear una publicación
taskRouter.post("/api/tasks", createTaskSchema, validator, ctrlcreateTask)

// endpoint para modificar una publicación
taskRouter.put("/api/tasks/:id", editTaskSchema, validator, ctrlUpdateTask)

// endpoint para eliminar una publicación
taskRouter.delete("/api/tasks/:id", ctrlDeleteTask)

export { taskRouter }