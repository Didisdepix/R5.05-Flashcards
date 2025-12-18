import {Router} from 'express'
import { getCurrentUser, login, register } from '../controllers/authController.js'
import { validateBody } from '../middlewares/validation.js'
import { loginSchema, registerSchema } from '../models/auth.js'
import { authenticateToken } from '../middlewares/autenticateToken.js'

const router = Router()

router.post('/register', validateBody(registerSchema) ,register)
router.post('/login', validateBody(loginSchema) ,login)
router.get('/', authenticateToken, getCurrentUser)

export default router