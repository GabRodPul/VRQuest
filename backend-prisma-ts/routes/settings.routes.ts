
import express, { Express } from "express";
import settingsController from "../controllers/settings.controller";
import authController from "../controllers/auth.controller";

const playerRouter = (app: Express) => {
    const router = express.Router();

    // Create new Settings
    router.post("/create", settingsController.create);

    // Retrieve all Settings
    router.get("/", settingsController.findAll);
    
    // Retrieve a single Player with either id or username
    router.get("/:sid", settingsController.findOne);
    router.get("/player/:pid", settingsController.findByPk);

    // Update Settings with Player id
    router.put("/:pid", settingsController.update);

    // Delete a Player with id
    router.delete("/:sid", settingsController.delete);


    app.use("/api/players", router);
}

export default playerRouter;