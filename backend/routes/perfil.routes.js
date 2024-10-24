import {Router} from 'express'
import * as perfilControllers from "../controllers/perfil.controllers.js"
import { verifyToken } from '../middlewares/middlewareToken.js'; // Middleware para verificar el token


const router = Router()

router.get("/perfil", verifyToken, perfilControllers.getUserProfile)


export default router