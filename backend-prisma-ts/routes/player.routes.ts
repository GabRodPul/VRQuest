import express, { Express } from "express";
import playerController from "../controllers/player.controller";
import authController from "../controllers/auth.controller";

const playerRouter = (app: Express) => {
    const router = express.Router();

    // Create a new Player
    router.post("/create", playerController.create);

    // Retrieve all Players
    router.get("/", playerController.findAll);
    
    // Retrieve a single Player with either id or username
    router.get("/search/:username", playerController.findOne);
    router.get("/:pid", playerController.findByPk);

    // Update a Player with id
    router.put("/:pid", playerController.update);

    // Delete a Player with id
    router.delete("/:pid", playerController.delete);
    router.post("/login", authController.login);
    router.post("/signin", authController.signin);

    app.use("/api/players", router);
}

export default playerRouter;