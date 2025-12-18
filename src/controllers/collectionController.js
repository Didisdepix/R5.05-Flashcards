import { like } from "drizzle-orm"
import { db } from "../db/database"
import { collection } from "../db/schema"

export const createCollection = async (request, response) => {
    try{
        console.log("Creating collection...")

        const {title, description, isPublic} = request.body
        const owner = request.user.userId

        const newCollection = await db.insert(collection).values({title,description, public: isPublic, userId:owner}).returning()

        response.status(201).send({message: "Collection created !"})
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to create collection"
        })
    }
}

export const getCollection = async (request, response) => {
    try{
        console.log("Retrieving collection...")

        const id = request.params

        const collec = await db.select().from(collection).where(eq(collection.id, id)).returning()

        response.send(200).json(collec)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to retrieve collection"
        })
    }
    
}

export const getMyCollections = async (request, response) => {
    try{
        console.log("Retrieving collections...")

        const id = request.user.userId

        const collecs = await db.select().from(collection).where(eq(collection.userId, id)).returning()

        response.send(200).json(collecs)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to retrieve collections"
        })
    }
    
}

export const getCollectionsFromTitle = async (request, response) => {
    try{
        console.log("Retrieving collections...")

        const str = request.params

        const collecs = await db.select().from(collection).where(eq(collection.public, 1), like(collection.title, `%${str}%`))

        response.send(200).json(collecs)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to retrieve collections"
        })
    }
    
}

export const modifyCollection = async (request, response) => {
    try{
        console.log("Modifying collection...")

        const {title, description, isPublic} = request.body
        const id = request.params

        await db.update(collection).set({title, description, public:isPublic}).where(eq(collection.id, id)).returning()

        response.send(200)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to modify collections"
        })
    }
    
}

export const deleteCollection = async (request, response) => {
    try{
        console.log("Deleted collection")

        const id = request.params

        await db.delete().from(collection).where(eq(collection.id, id))

        console.log("Collection deleted !")
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to delete collections"
        })
    }
}