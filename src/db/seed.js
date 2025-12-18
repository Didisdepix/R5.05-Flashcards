import { user, collection, flashcard, revision} from './schema.js'
import { db } from './database.js'
import { email } from 'zod'
import { hash } from 'bcrypt'

async function seed(){
    try{
        await db.delete(revision)
        await db.delete(flashcard)
        await db.delete(collection)
        await db.delete(user)

        const seedUser = [
            {
                email: "antoinerabute@gmail.com",
                name: "Antoine",
                surname: "RABUTE",
                password: await hash("iufgrehg", 15)
            },
            {
                email: "lucasdemaimay@gmail.com",
                name: "Lucas",
                surname: "DEMAIMAY",
                password: await hash("test", 15)
            },
            {
                email:"clementcatel@gmail.com",
                name: "Clement",
                surname: "CATEL",
                admin:1,
                password: await hash("mdpdur++", 15)
            }
        ]

        const createdUsers = await db.insert(user).values(seedUser).returning()

        const seedCollection = [
            {
                title: "Ma collec",
                public: 0,
                userId: createdUsers[0].id,
            },
            {
                title : "Ma collec publique",
                public: 1,
                userId: createdUsers[0].id,
            }
        ]

        const collections = await db.insert(collection).values(seedCollection).returning()

        const seedFlashcard = [
            {
                frontText: "Quel bruit fait la vache ?",
                backText: "Tchou tchou",
                collectionId: collections[0].id,
            }
        ]

        const flashcards = await db.insert(flashcard).values(seedFlashcard).returning()

        const seedRevision = [
            {
                flashcardId: flashcards[0].id,
                userId: createdUsers[0].id,
                level:1
            }
        ]

        await db.insert(revision).values(seedRevision).returning()

    }catch(error){console.error(error)}
}

seed()