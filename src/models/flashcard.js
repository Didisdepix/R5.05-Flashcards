import { z } from 'zod'

export const createFlashcardSchema = z.object ({
    frontText: z.string(),
    backText: z.string(),
    frontURL: z.url().optional(),
    backURL: z.url().optional(),
    collectionId: z.uuid()
})

export const modifyFlashcardSchema = z.object ({
    frontText: z.string().optional(),
    backText: z.string().optional(),
    frontURL: z.url().optional(),
    backURL: z.url().optional(),
})

export const flashcardIdSchema = z.object({
    id: z.uuid()
})