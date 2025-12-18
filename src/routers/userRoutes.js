import {Router} from 'express'
import { deleteUser, getUser, getUsers } from '../controllers/userController.js'
import { validateParams } from '../middlewares/validation.js'
import { userIdSchema } from '../models/user.js'
import { authenticateToken } from '../middlewares/autenticateToken.js'

const router = Router()

router.use(authenticateToken)

router.get("/", getUsers)
router.get("/:id", validateParams(userIdSchema), getUser)
router.delete("/", deleteUser)

export default router