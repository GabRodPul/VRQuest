import prisma from "../config/prisma";
import express, { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { GameData } from "../types/game.type";
import handleReqBody from "../utils/error-handleling";
import { PlayerData } from "../types/player.type";

// export type RecordData = {
//     rid: string;
//     pid: string;
//     score: number;
//     powerups: number;
//     time: number;
// };

const validate = {
    rdNotEmpty: (rd: GameData) => {
        return (
            rd.playerId !== undefined &&
            rd.score    !== undefined &&
            rd.powerups !== undefined &&
            rd.time     !== undefined
        );
    },

    emptyField: <T>(field: T) => {
        return field ? true : false;
    },
};

const gameController = {
    create: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<GameData>(
            req.body,
            { code: 400, msg: "Must playerId, score, powerups and time!" },
            validate.rdNotEmpty
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });

        // Player doesn't exist:
        if (
            !(await prisma.player.findUnique({
                where: { pid: result.value.playerId },
            }))
        )
            return res.json({ code: 404, msg: "Player not found" });

        // Everything's fine, collect data
        const record = {
            playerId: result.value.playerId,
            score: result.value.score,
            powerups: result.value.powerups,
            time: result.value.time,
        };

        prisma.game
            .create({ data: record })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                return res.json({
                    code: 500,
                    msg: "Some error occurred while saving the Game Data",
                });
            });
    },

    findAll: async (req: Request, res: Response) => {
        prisma.game
            .findMany()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send(
                    err.message ??
                        "Some error occurred while getting all Game Data"
                );
            });
    },

    findAllAndCount: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<{ playerId: string }>(
            req.params,
            { code: 400, msg: "Game ID cannot be empty!" },
            validate.emptyField
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg })

        // Player doesn't exist:
        if (
            !(await prisma.player.findUnique({
                where: { pid: result.value.playerId },
            }))
        )
            return res.json({ code: 404, msg: "Player not found" });

        const { playerId } = result.value;

        prisma.game
            .findMany({ where: { playerId } })
            .then((data) => {
                res.send(data);
            })  
            .catch((err) => {
                return res.json({
                    code: 500,
                    msg: "Some error ocurred while retrieving all Games by that Player"
                })
            });     
    },

    findByPk: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<{ gid: string }>(
            req.params,
            { code: 400, msg: "Game ID cannot be empty!" },
            validate.emptyField
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });

        const { gid } = result.value;

        // Send data
        // With promise
        prisma.game
            .findUnique({ where: { gid } })
            .then((data) => res.send(data))
            .catch((err) =>
                res
                    .status(500)
                    .send(
                        err.message ??
                            "Some error occurred while retrieving Game by GID"
                    )
            );
    },

    findOne: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<{ gid: string }>(
            req.params,
            { code: 400, msg: "Game ID cannot be empty!" },
            validate.emptyField
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });

        const { gid } = result.value;

        // Send data
        // With promise
        prisma.game
            .findUnique({ where: { gid } })
            .then((data) => res.send(data))
            .catch((err) =>
                res
                    .status(500)
                    .send(
                        err.message ??
                            "Some error occurred while retrieving Game by GID"
                    )
            );
    },

    update: async (req: Request<{ gid: string }>, res: Response) => {
        const result = handleReqBody.handleReqBody<GameData>(
            req.params,
            { code: 400, msg: "Content cannot be empty!" },
            validate.rdNotEmpty
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });
 
        const record = {
            playerId: result.value.playerId,
            score: result.value.score,
            powerups: result.value.powerups,
            time: result.value.time,
        };
 
        try {
            res.send(
                await prisma.game.update({
                    where: { gid: req.params.gid },
                    data: record,
                })
            );
        } catch (err: any) {
            res.status(500).send(
                "Some error occurred while retrieving Record by PID"
            );
        }
    },

    delete: async (req: Request<{ gid: string }>, res: Response) => {
        const result = handleReqBody.handleReqBody<{ gid: string }>(
            req.params,
            { code: 400, msg: "Game ID cannot be empty!" },
            validate.emptyField
        );

        if (!result.ok)
            return res.json({ code: result.error.code, msg: result.error.msg });
    
        const { gid } = result.value;
    
        try {
            res.send(
                await prisma.game.delete({
                    where: { gid },
                })
            );
        } catch (err: any) {
            res.status(500).send(
                "Some error occurred while deleting Record by PID"
            );
        }
    },
};

export default gameController;