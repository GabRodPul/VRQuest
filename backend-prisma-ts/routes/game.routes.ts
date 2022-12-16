import express, { Express } from "express";
import { RecordData } from "../types/record.type";
import recordController from "../controllers/record.controller";

const recordRouter = (app: Express) => {
    const router = express.Router();

    // Create a new Record
    router.post("/create", recordController.create);

    // Retrieve all Records
    router.get("/", recordController.findAll);

    // Retrieve one Record with rid
    router.get("/:rid", recordController.findByPk);
    
    // Retrieve all Records of a Player with pid
    router.get("/from/:pid", recordController.findAllAndCount );

    // Update a Record with id
    router.put("/:rid", recordController.update);

    // Delete a Player with id
    router.delete("/:rid", recordController.delete);


    app.use("/api/records", router);
}

export default recordRouter;