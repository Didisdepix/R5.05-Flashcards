import { z } from 'zod'

export const createCollectionSchema = z.object ({
    title: z.string(),
    description: z.string().optional(),
    public: z.boolean()
})

export const modifyCollectionSchema = z.object ({
    title: z.string().optional(),
    description: z.string().optional(),
    public: z.boolean().optional()
})

export const collectionIdSchema = z.object({
    id: z.uuid()
})

export const researchSchema = z.object({
    title: z.string()
})