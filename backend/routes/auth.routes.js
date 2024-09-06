import {Router} from 'express'
import * as authControllers from '../controllers/auth.controlles.js'

const router = Router()


router.post("/login", authControllers.loginUser)
router.post("/register", authControllers.registerUser)
router.post("/forgetPassword", authControllers.forgetPassword)
router.post("/verifyRecoveryCode", authControllers.verifyRecoveryCode)
router.post("/changePassword", authControllers.changePassword)





export default router