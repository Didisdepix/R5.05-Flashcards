import { sqliteTable, string, integer, text, boolean } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto'
import { boolean, minLength } from 'zod'
import { title } from 'process'
import { sql } from 'drizzle-orm'
import { table } from 'console'

export const user = sqliteTable('user', {
    id: string('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    email: string('email').notNull().unique(),
    surname: string('surname'),
    name: string('name'),
    // Je ne sais pas utiliser minLength
    password: string('password', {length:255}).notNull().minLength(8),
    admin: boolean('admin').default(false),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date()),
})

export const collection = sqliteTable('collection', {
    id: string('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    title: string('title', {length:255}).notNull(),
    description: string('description', {length:255}),
    public: boolean('public').notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date()),
    userId: string('userId', {length:36}).references(() => user.id).notNull()
})

export const flashcard = sqliteTable('flashcard', {
    id: string('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    frontText: string('frontText', {length: 255}).notNull(),
    backText: string('backText', {length:255}).notNull(),
    collectionId: string('collectionId', {length:36}).notNull().references(() => collection.id),
    frontURL: text('frontURL', {length:255}),
    backURL: text('backURL', {length:255}),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date())
})

export const revision = sqliteTable('revision', {
    flashcardId: string('flashcardId', {length:36}).references(() => flashcard.id).notNull(),
    userId: string('userId', {length:36}).references(() => user.id).notNull(),
    lastRevisionDate: integer('lastRevisionDate', {mode: 'timestamp'}).$defaultFn(() => new Date()),
    level: number('level', {enum: [1,2,3,4,5]}).notNull()
}, (table) => [
    foreignKey({
        columns: [table.flashcardId, table.userId],
        foreignColumns: [flashcard.id, table.id],
        name: "custom_fk"
    })
])