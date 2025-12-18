import { request } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

/**
 * 
 * @param {request} request 
 * @param {*} response 
 * @param {*} next 
 */
export const authenticateToken = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization
        const token = authHeader?.split(" ")[1]

        if (!token) {
            return response.status(401).json({ error: "Token is required" })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.userId
        request.user = { userId }
        next()
    } catch (error) {
        console.log(error)
        response.status(401).json({ error: "Invalid token" })
    }
}