import { Router } from "express";
import { ctrlDeletePost, ctrlGetPost, ctrlUpdatePost, ctrlView, ctrlcreatePost } from "../controllers/post.controllers.js";
import { createPostSchema, editPostSchema } from "../models/schemas/post.schema.js";
import { validator } from "../middlewares/validator.js";

const postRouter = Router();

//ruta para la vista
postRouter.get("/posts", ctrlView)

// endpoint para traer todas las publicaciones
postRouter.get("/api/posts", ctrlGetPost)

// endpoint para crear una publicación
postRouter.post("/api/posts", createPostSchema, validator, ctrlcreatePost)

// endpoint para modificar una publicación
postRouter.put("/api/posts/:id", editPostSchema, validator, ctrlUpdatePost)

// endpoint para eliminar una publicación
postRouter.delete("/api/posts/:id", ctrlDeletePost)

export { postRouter }