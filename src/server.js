import express from 'express'
import authRoutes from './routers/authRoutes.js'
import collectionRoutes from './routers/collectionRoutes.js'
import flashcardRoutes from './routers/flashcardRoutes.js'
import userRoutes from './routers/userRoutes.js'
import logger from './middlewares/logger.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use("/auth", authRoutes)
app.use("/collections", collectionRoutes)
app.use("/flashcards", flashcardRoutes)
app.use("/users", userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})