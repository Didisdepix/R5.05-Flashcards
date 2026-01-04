import {Router} from 'express'
import { createCollection, deleteCollection, getCollection, getCollectionsFromTitle, getMyCollections, modifyCollection } from '../controllers/collectionController.js'
import flashcardRoutes from './flashcardRoutes.js'
import { validateBody, validateParams } from '../middlewares/validation.js'
import { collectionIdSchema, createCollectionSchema, modifyCollectionSchema, researchSchema } from '../models/collection.js'
import { authenticateToken } from '../middlewares/autenticateToken.js'

const router = Router()

router.use(authenticateToken)

// The order has an influence on the validate used ?
router.get('/research', validateBody(researchSchema), getCollectionsFromTitle)
router.get("/:id/flashcards", validateParams(collectionIdSchema), flashcardRoutes)

router.post('/', validateBody(createCollectionSchema),createCollection)
router.get('/:id', validateParams(collectionIdSchema), getCollection)
router.get('/', getMyCollections)

router.patch('/:id', validateParams(modifyCollectionSchema),validateBody(modifyCollectionSchema), modifyCollection)
router.delete('/:id', validateParams(collectionIdSchema), deleteCollection)

export default router