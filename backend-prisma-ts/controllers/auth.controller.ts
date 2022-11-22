import express, { Request, Response } from "express";
import prisma from "../config/prisma";

import { PlayerData } from "../types/player.type";
import { encryptPassword, generateToken } from "../utils/encrypt";
import handleReqBody from "../utils/error-handleling";

// import playerController from "./player.controller";

function bodyNotEmpty(body: PlayerData): boolean {
    return body.username !== undefined && body.password !== undefined;
}

const authController = {
    
    login: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<PlayerData>(
            req.body,
            { code: 400, msg: "Must provide username and password!" },
            bodyNotEmpty
        );

        if (!result.ok) return res.json(result.error);

        const body: PlayerData = result.value;        
        prisma.player
            .findUnique({ where: { username: body.username } })
            .then((data) => {
                if (!data) {
                    return res.json({ code: 400, msg: "User doesn't exist." });
                }
                return res.json({ player: data, access_token: generateToken(data) })
            })
            .catch((err) => {
                res.status(500).send("Some error occurred while retrieving Player by PID");
            });
        
        /**
         * All this stuff sets headers again and HTTP doesn't like that so I just copied
         * and pasted the piece of code from the controller that retrieves some user
         * by its username.
         */
        // TODO: Find workaround for setting HTTP headers again.
        // playerController.findOne(req, res)
        //     .then(playerObj => {
        //         if (playerObj === undefined) 
        //             return res.json({ code: 401, msg: "Username or password not valid!" });

        //         const pass = playerObj.get("password");
        //         if (pass === undefined || !bcrypt.compareSync(body.password, pass))
        //             return res.json({ code: 401, msg: "Username or password not valid!" }); 
                
        //         return res.json({ player: playerObj, access_token: generateToken(playerObj) });
        //     })
        //     .catch(err => {
        //         return res.json({
        //             code: 500,
        //             msg: "Some error occurred while retrieving Player by PID",
        //         });
        //     });
    },

    signin: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<PlayerData>(
            req.body,
            { code: 400, msg: "Must provide username and password!" },
            bodyNotEmpty
        );

        if (!result.ok) return res.json(result.error);

        /**
         * Same here. Copied and pasted from player.controller.ts since I can't 
         * really use it here for now until I somehow find a workaround for setting
         * HTTP headers again.
         */
        // TODO: Find workaround for setting HTTP headers again.
        // Encrypt and save data
        const body = {
            username: result.value.username,
            password: await encryptPassword(result.value.password),
        };

        // With promise
        prisma.player
            .create({ data: body })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                switch (err.code) {
                    case "P2002":
                        return res.json({
                            code: 400,
                            msg: `Player with username ${body.username} already exists`
                        });

                    default:
                        return res.json({
                            code: 500,
                            msg: "Some error occurred while creating the Player",
                        });
                }
            });
    }
};

export default authController;