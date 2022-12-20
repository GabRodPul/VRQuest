import express from "express"
import playerRouter from "./routes/player.routes"
import recordRouter from "./routes/record.routes"
// import prisma from "./prisma" // importing the prisma instance we created.
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

// Initialize routes
playerRouter(app);
recordRouter(app);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))