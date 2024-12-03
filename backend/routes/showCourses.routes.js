import {Router} from 'express'
import * as showCourseControllers from "../controllers/showcourse.controllers.js"
import { verifyToken } from "../middlewares/middlewareToken.js"; // Middleware para verificar el token
import { checkInstructorRole } from "../middlewares/isInstructorMiddleware.js";


const router = Router()

router.get("/cursos", showCourseControllers.getCourses)
router.get("/courses/:courseId/details", showCourseControllers.getCourseDetails);



export default router


