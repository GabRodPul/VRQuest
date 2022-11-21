import express from "express"
import playerRouter from "./routes/player.routes"
// import prisma from "./prisma" // importing the prisma instance we created.

const app = express()
app.use(express.json())

// Initialize routes
playerRouter(app);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))