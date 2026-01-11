import {Router} from 'express'
import { getFlashcards, getFlashcardsToLearn } from '../controllers/flashcardCollectionController.js'
import { authenticateToken } from '../middlewares/autenticateToken.js'

const router = Router({mergeParams: true})

router.get("/revision", getFlashcardsToLearn)
router.get("/flashcards", getFlashcards)


export default router