import {Router} from 'express'
import { createFlashcard, deleteFlashcard, getFlashcard, getFlashcards, getFlashcardsToLearn, learnFlashcard, modifyFlashcard } from '../controllers/flashcardController.js'

const router = Router()

router.post("/", createFlashcard)
router.get("/:id", getFlashcard)
router.get("/", getFlashcards)
router.get("/revision", getFlashcardsToLearn)
router.post("/revision/:id", learnFlashcard)
router.patch("/", modifyFlashcard)
router.delete("/", deleteFlashcard)


export default router