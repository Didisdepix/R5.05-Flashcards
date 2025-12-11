import {Router} from 'express'
import { createCollection, deleteCollection, getCollection, getCollectionsFromTitle, getMyCollections, modifyCollection } from '../controllers/collectionController.js'

const router = Router()

router.post('/', createCollection)
router.get('/:id', getCollection)
router.get('/', getMyCollections)
router.get('/research/:title', getCollectionsFromTitle)
router.patch('/', modifyCollection)
router.delete('/', deleteCollection)

export default router