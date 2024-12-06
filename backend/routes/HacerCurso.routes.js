import express from "express";
import * as hacerCursoController from "../controllers/HacerCurso.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Importar el middleware

const router = express.Router();

// Ruta para obtener las unidades de un curso
router.get('/hacercurso/:courseId', verifyToken, hacerCursoController.getCourseUnits);

export default router;
