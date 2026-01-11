import {Router} from 'express'
import { getFlashcards, getFlashcardsToLearn } from '../controllers/flashcardCollectionController.js'

const router = Router({mergeParams: true})

router.get("/revision", getFlashcardsToLearn)
router.get("/flashcards", getFlashcards)


export default router