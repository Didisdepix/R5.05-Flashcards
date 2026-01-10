import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { collection, flashcard, revision } from "../db/schema.js"

export const createFlashcard = async (request, response) => {
    try {
        const body = request.body
        
        const [targetCollection] = await db.select().from(collection).where(eq(collection.id, body.collectionId))
        
        if( targetCollection.userId != request.user.userId ) {
            response.status(403).json({
                error: "Unauthorized to create flashcard...",
            })
        }

        const [createdFlashcard] = await db.insert(flashcard).values(body).returning()

        response.status(201).json({
            message: "Flashcard created successfully.",
            data: createdFlashcard
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to create flashcard..."
        })
    }
}

export const getFlashcard = async (request, response) => {
    try {
        const params = request.params
        const [targetFlashcard] = await db.select().from(flashcard).where(eq(flashcard.id, params.id))
        const [targetCollection] = await db.select().from(collection).where(eq(collection.id, targetFlashcard.collectionId))

        if(!targetCollection.public && (targetCollection.userId != request.user.userId)) {
            response.status(403).json({
                error: "Unauthorized to get flashcard...",
            })
        }

        response.status(201).json(targetFlashcard)

    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to get flashcard..."
        })
    }
}

export const modifyFlashcard = async (request, response) => {
    try {
        const params = request.params
        const body = request.body
        const [targetFlashcard] = await db.select().from(flashcard).where(eq(flashcard.id, params.id))
        const [targetCollection] = await db.select().from(collection).where(eq(collection.id, targetFlashcard.collectionId))

        if( targetCollection.userId != request.user.userId ) {
            response.status(403).json({
                error: "Unauthorized to modify flashcard...",
            })
        }

        console.log(body.frontURL)

        const [modifiedFlashcard] = await db.update(flashcard).set({
            frontText: body.frontText === undefined  ? targetFlashcard.frontText : body.frontText,
            backText: body.backText === undefined ? targetFlashcard.backText : body.backText ,
            frontURL: body.frontURL === undefined ? targetFlashcard.frontURL : body.frontURL ,
            backURL: body.backURL === undefined ? targetFlashcard.backURL : body.backURL
        }).where(eq(flashcard.id, targetFlashcard.id)).returning()
        
        response.status(201).json({
            message: "Flashcard modified successfully.",
            data: modifiedFlashcard
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to modify flashcard..."
        })
    }
}

export const deleteFlashcard = async (request, response) => {
    try {
        const params = request.params
        const [targetFlashcard] = await db.select().from(flashcard).where(eq(flashcard.id, params.id))
        const [targetCollection] = await db.select().from(collection).where(eq(collection.id, targetFlashcard.collectionId))

        if( targetCollection.userId != request.user.userId ) {
            response.status(403).json({
                error: "Unauthorized to create flashcard...",
            })
        }

        const [deletedFlashcard] = await db.delete(flashcard).where(eq(flashcard.id, targetFlashcard.id)).returning()

        if(!deletedFlashcard) {
            return response.status(404).json({ error: "Flashcard not found..."})
        }
        response.status(200).json({
            message: "Flashcard deleted.",
            data: deletedFlashcard
        })  
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to delete flashcard..."
        })
    }
}

export const learnFlashcard = async (request, response) => {
    try {
        const body = request.body
        const [targetFlashcard] = await db.select().from(flashcard).where(eq(flashcard.id, body.flashcardId))
        const [targetCollection] = await db.select().from(collection).where(eq(collection.id, targetFlashcard.collectionId))

        if(!targetCollection.public && (targetCollection.userId != request.user.userId)) {
            response.status(403).json({
                error: "Unauthorized to learn flashcard...",
            })
        }

        console.log(body.flashcardId)
        console.log(request.user.userId)
        console.log(body.level)

        const [learnedFlashcard] = await db.insert(revision).values({
            flashcardId: body.flashcardId,
            userId: request.user.userId,
            level: body.level
        }).onConflictDoUpdate({
            target: [revision.flashcardId, revision.userId],
            set: {
                level: body.level,
                lastRevisionDate: new Date(),
            }
        }).returning()

        console.log("hello")

        response.status(200).json({
            message: "Flashcard learned.",
            data: learnedFlashcard
        })  
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to learn flashcard..."
        })
    }
}
