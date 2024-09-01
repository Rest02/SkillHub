import {Router} from 'express'
import * as authControllers from '../controllers/auth.controlles.js'

const router = Router()


router.post("/login", authControllers.loginUser)
router.post("/register", authControllers.registerUser)
router.post('/request-password-reset', authControllers.requestPasswordReset);
router.post('/reset-password', authControllers.resetPassword);



export default router