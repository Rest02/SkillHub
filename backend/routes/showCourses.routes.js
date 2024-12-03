import {Router} from 'express'
import * as showCourseControllers from "../controllers/showcourse.controllers.js"
import { verifyToken } from "../middlewares/middlewareToken.js"; // Middleware para verificar el token
import { checkInstructorRole } from "../middlewares/isInstructorMiddleware.js";


const router = Router()

router.get("/cursos", showCourseControllers.getCourses)


export default router


