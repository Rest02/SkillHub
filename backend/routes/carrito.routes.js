import express from "express";
import * as cartControllers from "../controllers/carrito.controllers.js";
import { verifyToken } from "../middlewares/middlewareToken.js"; // Importar el middleware

const router = express.Router();

// Ruta protegida para obtener el carrito del usuario
router.get("/carrito", verifyToken, cartControllers.getCarrito);

export default router;
