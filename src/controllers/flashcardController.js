import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { collection, flashcard } from "../db/schema.js"

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
        
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to get flashcard..."
        })
    }
}

export const getFlashcards = async (request, response) => {
    try {
        
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to get flashcards..."
        })
    }
}

export const getFlashcardsToLearn = async (request, response) => {
    try {
        
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to get flashcards to learn..."
        })
    }
}

export const modifyFlashcard = async (request, response) => {
    try {
        
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
        console.log(params.id)
        const [targetFlashcard] = await db.select().from(flashcard).where(eq(flashcard.id, params.id))
        console.log(targetFlashcard)
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
            message: "Flashcard deleted...",
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
        
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to learn flashcard..."
        })
    }
}
