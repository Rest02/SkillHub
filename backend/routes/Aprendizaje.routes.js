import express from "express";
import * as aprendizajeControllers from "../controllers/Aprendizaje.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Importar el middleware



const router = express.Router();


router.get("/aprendizaje", verifyToken, aprendizajeControllers.getUserCourses)


export default router;
