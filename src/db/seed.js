import { user, collection, flashcard, revision} from './schema.js'
import { db } from './database.js'
import { email } from 'zod'

async function seed(){
    try{
        await db.delete(user)
        await db.delete(collection)
        await db.delete(flashcard)
        await db.delete(revision)

        const seedUser = [
            {
                id: "1",
                email: "antoinerabute@gmail.com",
                name: "Antoine",
                surname: "RABUTE",
                password: "iufgrehg"
            },
            {
                email: "lucasdemaimay@gmail.com",
                name: "Lucas",
                surname: "DEMAIMAY",
                password: "test"
            }
        ]

        const createdUsers=await db.insert(user).values(seedUser).returning()

        const seedCollection = [
            {
                title: "Ma collec",
                public: 0,
                userId:"1",
                id: "2"
            }
        ]

        await db.insert(collection).values(seedCollection).returning()

        const seedFlashcard = [
            {
                frontText: "Quel bruit fait la vache ?",
                backText: "Tchou tchou",
                collectionId: "2",
                id:"3"
            }
        ]

        await db.insert(flashcard).values(seedFlashcard).returning()

        const seedRevision = [
            {
                flashcardId: "3",
                userId: "1",
                level:1
            }
        ]

        await db.insert(revision).values(seedRevision).returning()

    }catch(error){console.error(error)}
}

seed()