import {Router} from 'express'
import { createFlashcard, deleteFlashcard, getFlashcard, getFlashcards, getFlashcardsToLearn, learnFlashcard, modifyFlashcard } from '../controllers/flashcardController.js'
import { validateBody, validateParams } from '../middlewares/validation.js'
import { createFlashcardSchema, flashcardIdSchema, modifyFlashcardSchema } from '../models/flashcard.js'
import { authenticateToken } from '../middlewares/autenticateToken.js'

const router = Router({mergeParams: true})

router.use(authenticateToken)

router.post("/", validateBody(createFlashcardSchema), createFlashcard)
router.get("/:id", validateParams(flashcardIdSchema), getFlashcard)
router.get("/", getFlashcards)
router.get("/revision", getFlashcardsToLearn)
router.post("/revision", learnFlashcard)
router.patch("/:id",  validateParams(flashcardIdSchema), validateBody(modifyFlashcardSchema), modifyFlashcard)
router.delete("/:id", validateParams(flashcardIdSchema), deleteFlashcard)


export default router