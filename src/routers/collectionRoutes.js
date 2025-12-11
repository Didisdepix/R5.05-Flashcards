import {Router} from 'express'
import { createCollection, deleteCollection, getCollection, getCollectionsFromTitle, getMyCollections, modifyCollection } from '../controllers/collectionController.js'
import flashcardRoutes from './flashcardRoutes.js'

const router = Router()

router.use("/:id/flashcards", flashcardRoutes)

router.post('/', createCollection)
router.get('/:id', getCollection)
router.get('/', getMyCollections)
router.get('/research/:title', getCollectionsFromTitle)
router.patch('/', modifyCollection)
router.delete('/', deleteCollection)

export default router