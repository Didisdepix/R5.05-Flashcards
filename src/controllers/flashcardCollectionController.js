import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { collection, flashcard, revision } from "../db/schema.js"

export const getFlashcards = async (request, response) => {
    try {
        const params = request.params

        const [targetCollection] = await db.select().from(collection).where(eq(collection.id, params.id))

        if(!targetCollection.public && (targetCollection.userId != request.user.userId)) {
            response.status(403).json({
                error: "Unauthorized to get flashcards...",
            })
        }

        const selectedFlashcards = await db.select().from(flashcard).where(eq(flashcard.collectionId, targetCollection.id))

        response.status(200).json(selectedFlashcards)

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