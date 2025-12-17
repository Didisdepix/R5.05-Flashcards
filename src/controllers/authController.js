import { hash, compare } from "bcrypt"
import { user } from "../db/schema.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { db } from "../db/database.js"
import { eq } from "drizzle-orm"

export const register = async (request, response) => {
    
    try {
        const {email, name, surname, password} = request.body

        const hashedPassword = await hash(password, 15)

        const [newUser] = await db.insert(usetTable).values({
            email,
            name,
            surname,
            password: hashedPassword
        }).returning({
            email: user.email,
            name: user.name,
            surname: user.surname,
            id: user.id
        })

        const token = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET, {expiresIn: '24h'})

        response.status(201).json({
            message: "User created successfully.",
            userData: newUser,
            token
        })

    } catch(error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to register..."
        })
    }

}

export const login = async (request, response) => {
    
    try {
        const {email, password} = request.body

        const [newUser] = await db.select().from(user).where(eq(user.email, email));

        if(!newUser) {
            response.status(401).json({
                error: "Incorrect email or password...",
            }) 
        }

        const isPasswordOk = await compare(password, newUser.password)

        if(isPasswordOk) {
            const token = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET, { expiresIn: '24h'})
            response.status(201).json({
                message: "User logged in successfully.",
                userData: newUser,
                token
            }) 
        } else {
            response.status(401).json({
                error: "Incorrect email or password...",
            }) 
        }

        
    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to login..."
        })
    }
}

export const getCurrentUser = async (request, response) => {
    
    try {
        const [currentUser] =await db.select().from(user).where(eq(user.id, request.user.userId))

        response.status(200).json({
            email: currentUser.email,
            name: currentUser.name,
            surname: currentUser.surname
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({
            error: "Failed to get current user..."
        })
    }

}