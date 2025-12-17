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
    console.log("isOk")
    response.send()
}

export const getCollectionsFromTitle = async (request, response) => {
    console.log("isOk")
    response.send()
}

export const modifyCollection = async (request, response) => {
    console.log("isOk")
    response.send()
}

export const deleteCollection = async (request, response) => {
    console.log("isOk")
    response.send()
}