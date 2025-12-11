import { sqliteTable, integer, text, boolean, foreignKey } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto'
import { boolean, minLength } from 'zod'
import { title } from 'process'
import { sql } from 'drizzle-orm'
import { table } from 'console'

export const user = sqliteTable('user', {
    id: text('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    email: text('email').notNull().unique(),
    surname: text('surname'),
    name: text('name'),
    // Je ne sais pas utiliser minLength
    password: text('password', {length:255, minLength:8}).notNull(),
    admin: integer('admin', {mode: boolean}).default(false),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date()),
})

export const collection = sqliteTable('collection', {
    id: text('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    title: text('title', {length:255}).notNull(),
    description: text('description', {length:255}),
    public: integer('public', {boolean}).notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date()),
    userId: text('userId', {length:36}).references(() => user.id).notNull()
})

export const flashcard = sqliteTable('flashcard', {
    id: text('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    frontText: text('frontText', {length: 255}).notNull(),
    backText: text('backText', {length:255}).notNull(),
    collectionId: text('collectionId', {length:36, onDelete: 'cascade'}).notNull().references(() => collection.id),
    frontURL: text('frontURL', {length:255}),
    backURL: text('backURL', {length:255}),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date())
})

export const revision = sqliteTable('revision', {
    flashcardId: text('flashcardId', {length:36}).references(() => flashcard.id).notNull(),
    userId: text('userId', {length:36}).references(() => user.id).notNull(),
    lastRevisionDate: integer('lastRevisionDate', {mode: 'timestamp'}).$defaultFn(() => new Date()),
    level: integer('level', {enum: [1,2,3,4,5]}).notNull()
}, (table) => [
    foreignKey({
        columns: [table.flashcardId, table.userId],
        foreignColumns: [flashcard.id, user.id],
        name: "custom_fk",
        onDelete: 'cascade'
    })
])