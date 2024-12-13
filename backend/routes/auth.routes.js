import {Router} from 'express'
import * as authControllers from '../controllers/auth.controlles.js'
import {verifyToken} from '../middlewares/middlewareToken.js'

const router = Router()


router.post("/login", authControllers.loginUser)
router.post("/register", authControllers.registerUser)
router.post("/verifyUser", verifyToken, authControllers.verifyUser);
router.post("/forgetPassword", authControllers.forgetPassword)
router.post("/verifyRecoveryCode/:token", authControllers.verifyRecoveryCode)
router.post("/changePassword/:token", authControllers.changePassword)
router.put('/users/update-role', verifyToken, authControllers.updateUserRole);






export default router