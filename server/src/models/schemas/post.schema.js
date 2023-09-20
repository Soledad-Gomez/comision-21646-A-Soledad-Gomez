import { body } from "express-validator";

export const createPostSchema = [
    body("titulo")
        .isString().withMessage("Debes escribir un título")
        .notEmpty().withMessage("El título del post no debe estar vacío"),
    body("contenido")
        .isString().withMessage("Debes escribir contenido")
        .notEmpty().withMessage("El contenido del post no debe estar vacío"),
    body("enlace")
        .isURL().withMessage("Ingrese una URL válida")
        .notEmpty().withMessage("Este campo no debe estar vacío")
]

export const editPostSchema = [
    body("titulo")
    .optional()
    .isString().withMessage("Debes escribir un título")
    .notEmpty().withMessage("El título del post no debe estar vacío"),
body("contenido")
    .optional()
    .isString().withMessage("Debes escribir contenido")
    .notEmpty().withMessage("El contenido del post no debe estar vacío"),
body("enlace")
    .optional()
    .isURL().withMessage("Ingrese una URL válida")
    .notEmpty().withMessage("Este campo no debe estar vacío")

]