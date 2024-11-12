// course.routes.js
import { Router } from "express";
import * as courseControllers from "../controllers/course.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Middleware para verificar el token
import uploadThumbnail from "../middlewares/uploadThumbnailMiddlware.js"; // Middleware para miniaturas

const router = Router();

// En course.routes.js antes de uploadVideo y uploadThumbnail
// Agrega un middleware para verificar los archivos que está procesando Multer
router.post(
  "/courses",
  verifyToken,
  uploadThumbnail.single("thumbnail"),
  courseControllers.createCourse
);

export default router;
