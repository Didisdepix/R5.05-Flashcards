import {Router} from 'express'
import { deleteUser, getUser, getUsers } from '../controllers/userController'

const router = Router()

router.get("/", getUsers)
router.get("/:id", getUser)
router.delete("/", deleteUser)

export default router