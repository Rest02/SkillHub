// course.routes.js
import { Router } from "express";
import * as courseControllers from "../controllers/course.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Middleware para verificar el token
import uploadThumbnail from "../middlewares/uploadThumbnailMiddlware.js";
import uploadVideo from "../middlewares/uploadVideoMiddleware.js";
import { checkInstructorRole } from "../middlewares/isInstructorMiddleware.js";
const router = Router();

// En course.routes.js antes de uploadVideo y uploadThumbnail
// Agrega un middleware para verificar los archivos que está procesando Multer

// -------------------------- POST Crear Cursos COMPLETOS --------------------------

//Ruta para crear Curso dependiendo de user
router.post(
  "/courses",
  verifyToken,
  checkInstructorRole,
  uploadThumbnail.single("thumbnail"), // para la portada
  courseControllers.createCourse
);

//Ruta para crear Unidad dependiendo del curso
router.post(
  "/courses/:courseId/units",
  verifyToken,
  checkInstructorRole,
  courseControllers.createUnit
);

// Ruta para subir Video dependiendo de unidad
router.post(
  "/units/:curso_id/videos",
  verifyToken,
  checkInstructorRole,
  uploadVideo.single("video"),
  courseControllers.uploadVideo
);

// Ruta para subir Miniatura del video
router.post(
  "/units/:video_id/thumbnails",
  verifyToken,
  checkInstructorRole,
  uploadThumbnail.single("thumbnail"),
  courseControllers.uploadThumbnail
);

// ---------------------------------------------------------------------------------

// -------------------------- GET --------------------------

router.get(
  "/misCursos",
  verifyToken,
  checkInstructorRole,
  courseControllers.getCourses
);

router.get(
  "/categorias",
  verifyToken,
  checkInstructorRole,
  courseControllers.getCategorias
);

router.get("/courses/:courseId/unitsandvideos", verifyToken, checkInstructorRole, courseControllers.getCourseUnitsAndVideos)

router.get("/units/:curso_id/videos", verifyToken, checkInstructorRole, courseControllers.getUnitsOfCourse)


// --------------------------------------------------------



// ----------- Update Units ----------

router.get("/units/:curso_id/update", verifyToken, checkInstructorRole, courseControllers.getUnidadById)
router.put("/units/:curso_id/update", verifyToken, checkInstructorRole, courseControllers.updateUnidad)



export default router;
