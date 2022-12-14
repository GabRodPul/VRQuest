import express, { Express } from "express";
import { GameData } from "../types/game.type";
import gameController from "../controllers/game.controller";

const recordRouter = (app: Express) => {
    const router = express.Router();

    // Create a new Record
    router.post("/create", gameController.create);

    // Retrieve all Records
    router.get("/", gameController.findAll);

    // Retrieve one Record with rid
    router.get("/:rid", gameController.findByPk);
    
    // Retrieve all Records of a Player with pid
    router.get("/from/:pid", gameController.findAllAndCount );

    // Update a Record with id
    router.put("/:rid", gameController.update);

    // Delete a Player with id
    router.delete("/:rid", gameController.delete);


    app.use("/api/records", router);
}

export default recordRouter;