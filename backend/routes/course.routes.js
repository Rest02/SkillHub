// course.routes.js
import { Router } from "express";
import * as courseControllers from "../controllers/course.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Middleware para verificar el token
import uploadThumbnail from '../middlewares/uploadThumbnailMiddlware.js'

const router = Router();

// En course.routes.js antes de uploadVideo y uploadThumbnail
// Agrega un middleware para verificar los archivos que está procesando Multer
router.post('/courses', 
    verifyToken, 
    uploadThumbnail.single('thumbnail'), // para la portada
    courseControllers.createCourse
);

router.post('/courses/:courseId/units', verifyToken, courseControllers.createUnit);


export default router;
