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
    frontURL: z.url().nullable().optional(),
    backURL: z.url().nullable().optional(),
})

export const learnlashcardSchema = z.object({
    flashcardId: z.uuid(),
    level: z.number().int().min(1).max(5)
})

export const flashcardIdSchema = z.object({
    id: z.uuid()
})