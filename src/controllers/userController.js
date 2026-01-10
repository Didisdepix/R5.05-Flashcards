import { and, like } from "drizzle-orm"
import { db } from "../db/database.js"
import { collection, user } from "../db/schema.js"
import { eq } from "drizzle-orm"

export const getUsers = async (request, response) => {
    
    try{

        console.log("Retrieving users...")

        const [requestingUser] = await db.select().from(user).where(eq(user.id, request.user.userId))

        if(!requestingUser.admin){
            response.status(403).json({
                    error:"User not authorized"
            })
        }

        const users = await db.select().from(user).orderBy(user.createdAt)

        response.status(200).json(users)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to retrieve users"
        })
    }
}

export const getUser = async (request, response) => {
    try{
        console.log("Retrieving user...")
        const id = request.params
        const [requestingUser] = await db.select().from(user).where(eq(user.id, request.user.userId))

        if(!requestingUser.admin){
            response.status(403).json({
                    error:"User not authorized"
            })
        }

        const [users] = await db.select().from(user).where(eq(user.id, id.id))

        response.status(200).json(users)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to retrieve user"
        })
    }
}

export const deleteUser = async (request, response) => {
    try{
        console.log("Deleting user...")
        const id = request.params
        const [requestingUser] = await db.select().from(user).where(eq(user.id, request.user.userId))

        if(!requestingUser.admin){
            response.status(403).json({
                    error:"User not authorized"
            })
        }

        const [userToDelete] = await db.delete(user).where(eq(user.id, id.id)).returning()
        if(!userToDelete){
            response.status(404).json({
                Message:"User does not exist"
            })
        }else{

            response.status(200).json({
                Message: "User deleted"
            })
        }
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: "Failed to delete user"
        })
    }
}


