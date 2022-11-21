import prisma from "../config/prisma";
import express, { Request, Response } from "express";
import { encryptPassword } from "../utils/encrypt";
import { Prisma, Result } from "@prisma/client";
import { PlayerData } from "../types/player.type";
import handleReqBody from "../utils/error-handleling";

const validate = {
    pdNotEmpty: (pd: PlayerData) => {
        return pd.username !== undefined && pd.password !== undefined;
    },

    emptyField: <T>(field: T) => {
        return field ? true : false;
    },
};

const playerController = {
    create: async (req: Request, res: Response) => {
        // // Validate request
        // if (!req.body) {
        //     res.status(400).send("Empty request!");
        //     return;
        // }
        // const body = req.body as PlayerData;

        // console.log(body);
        // if (!body.username || !body.password) {
        //     res.status(400).send("Content cannot be empty!");
        //     return;
        // }
        const result = handleReqBody.handleReqBody<PlayerData>(
            req,
            { code: 400, msg: "Must provide username and password!" },
            validate.pdNotEmpty
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });

        // Encrypt and save data
        const player = {
            username: result.value.username,
            password: await encryptPassword(result.value.password),
        };

        // With promise
        prisma.player
            .create({ data: player })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                switch (err.code) {
                    case "P2002":
                        // return res.json({
                        //     code: 400, msg: `Player with username ${player.username} already exists`
                        // });
                        res.status(400).send("cagaste");

                    default:
                        return res.json({
                            code: 500,
                            msg: "Some error occurred while creating the Player",
                        });
                }
            });

        // try {
        //     const data: PlayerData = await prisma.player.create({
        //         data: player,
        //     });
        //     // delete data.password;
        //     res.send(data);
        // } catch (err: any) {
        //     console.log(err);
        //     switch (err.code) {
        //         case "P2002":
        //             res.status(400).send(
        //                 `Player with username ${player.username} already exists`
        //             );
        //             break;

        //         default:
        //             console.error(err.message);
        //             res.status(500).send(
        //                 "Some error occurred while creating the Player"
        //             );
        //     }
        // }
    },

    findAll: async (req: Request, res: Response) => {
        // With promise:
        prisma.player
            .findMany()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send(
                    err.message ?? "Some error occurred while all Players"
                );
            });

        // try {
        //     res.send(await prisma.player.findMany());
        // } catch (err: any) {
        //     res.status(500).send(
        //         err.message ??
        //             "Some error occurred while retrieving all Players"
        //     );
        // }
    },

    findByPk: async (req: Request<{ pid: string }>, res: Response) => {
        // Validate request
        if (!req.params) {
            res.status(400).send("Empty request!");
            return;
        }
        const { pid } = req.params as { pid: string };

        if (!pid || pid === "") {
            res.status(400).send("PID cannot be empty!");
            return;
        }

        // Send data
        // With promise
        // prisma.player
        //     .findUnique({ where: { pid } })
        //     .then((data) => res.send(data))
        //     .catch((err) => res.status(500)
        //                        .send(err.message ?? "Some error occurred while retrieving Player by PID")
        //     );

        try {
            res.send(await prisma.player.findUnique({ where: { pid } }));
        } catch (err: any) {
            res.status(500).send(
                err.message ??
                    "Some error occurred while retrieving Player by PID"
            );
        }
    },

    findOne: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<{ username: string }>(
            req.params,
            { code: 400, msg: "Username cannot be empty!" },
            (u): boolean => {
                return u !== undefined || u !== "";
            }
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });

        const { username } = result.value;

        // Send data
        // With promise
        prisma.player
            .findUnique({ where: { username } })
            .then((data) => {
                if (!data) {
                    return res.json({ code: 400, msg: "User doesn't exist." });
                }
                return res.json(data);
            })
            .catch((err) => {
                return res.json({
                    code: 500,
                    msg: "Some error occurred while retrieving Player by PID",
                });
            });

        // try {
        //     console.log("findOne", username);
        //     res.send(
        //         await prisma.player.findUnique({
        //             where: { username },
        //         })
        //     );
        // } catch (err: any) {
        //     res.status(500).send(
        //         "Some error occurred while retrieving Player by PID"
        //     );
        // }
    },

    update: async (req: Request<{ pid: string }>, res: Response) => {
        // Validate request
        if (!req.body) {
            res.status(400).send("Empty request!");
            return;
        }
        const body = req.body as PlayerData;

        if (!body.username || !body.password) {
            res.status(400).send("Must provide username and password!");
            return;
        }

        // Encrypt and save data
        const player = {
            username: body.username,
            password: await encryptPassword(body.password),
        };

        // Send data
        try {
            res.send(
                await prisma.player.update({
                    where: { pid: req.params.pid },
                    data: player,
                })
            );
        } catch (err: any) {
            res.status(500).send(
                "Some error occurred while retrieving Player by PID"
            );
        }
    },

    delete: async (req: Request<{ pid: string }>, res: Response) => {
        // Validate request
        if (!req.body) {
            res.status(400).send("Empty request!");
            return;
        }
        const { pid } = req.params as { pid: string };

        if (!pid) {
            res.status(400).send("Content cannot be empty!");
            return;
        }

        // Send data
        try {
            res.send(
                await prisma.player.delete({
                    where: { pid },
                })
            );
        } catch (err: any) {
            res.status(500).send(
                "Some error occurred while deleting Player by PID"
            );
        }
    },
};

export default playerController;
