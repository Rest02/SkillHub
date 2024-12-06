import express from "express";
import * as hacerCursoController from "../controllers/HacerCurso.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Importar el middleware

const router = express.Router();

// Ruta para obtener las unidades de un curso
router.get('/hacercurso/:courseId', verifyToken, hacerCursoController.getCourseUnits);

router.post('/hacercurso/:courseId', verifyToken, hacerCursoController.createResponse); // Ahora la ruta es POST en la misma URL


router.post('/hacercurso/:courseId/comment', verifyToken, hacerCursoController.createComment);


export default router;
