import { z } from 'zod'

export const registerSchema = z.object({
    email: z.email(),
    name: z.string(),
    surname: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(255, 'Password can not exceed 255 characters'),
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(255, 'Password can not exceed 255 characters')
})