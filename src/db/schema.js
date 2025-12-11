import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto'
import { boolean, minLength, string } from 'zod'
import { timeStamp } from 'console'

export const user = sqliteTable('user', {
    id: string('id', {length: 36}).primaryKey().$defaultFn(() => randomUUID()),
    email: string('email').notNull().unique(),
    surname: string('surname'),
    name: string('name'),
    password: string('password', {minLength: 8, length:255}).notNull(),
    admin: boolean('admin').default(false),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date()),
})