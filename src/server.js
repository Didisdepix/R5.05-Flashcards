import express from 'express'
import authRoutes from './routers/authRoutes.js'
import collectionRoutes from './routers/collectionRoutes.js'
import flashcardRoutes from './routers/flashcardRoutes.js'
import userRoutes from './routers/userRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/collection", collectionRoutes)
app.use("/flashcard", flashcardRoutes)
app.use("/user", userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})