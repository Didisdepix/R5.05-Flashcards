import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { collection, flashcard, revision } from "../db/schema.js"

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