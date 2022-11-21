import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

import prisma from "../config/prisma";

import { PlayerData } from "../types/player.type";
import playerController from "./player.controller";

import handleReqBody from "../utils/error-handleling";
import { Result, ResParams } from "../utils/error-handleling";

import bcrypt from "bcrypt";
import { generateToken } from "../utils/encrypt";


function bodyNotEmpty(body: PlayerData): boolean {
    return body.username !== undefined && body.password !== undefined;
}

const authController = {
    
    login: async (req: Request, res: Response) => {
        console.log(req);
        const result = handleReqBody.handleReqBody<PlayerData>(
            req.body,
            { code: 400, msg: "Must provide username and password!" },
            bodyNotEmpty
        );

        if (!result.ok) return res.json(result.error);
        

        const body: PlayerData = result.value;

        try {
            const playerObj = await playerController.findOne(req, res);
            if (playerObj === undefined) return res.json({ code: 401, msg: "Username or password not valid!" });;

            const pass = playerObj.get("password");
            if (pass === undefined || !bcrypt.compareSync(body.password, pass))
                return res.json({ code: 401, msg: "Username or password not valid!" });;

            return res.json({ player: playerObj, access_token: generateToken(playerObj) });
        } catch (err: any) {
            return res.json({
                code: 500,
                msg: "Some error occurred while retrieving Player by PID",
            });
        }
    },

    signin: async (req: Request, res: Response) => {
        const result = handleReqBody.handleReqBody<PlayerData>(
            req.body,
            { code: 400, msg: "Must provide username and password!" },
            bodyNotEmpty
        );

        if (!result.ok) return res.json(result.error);

        try {
            const playerObj = await playerController.findOne(req, res);
            if (playerObj !== undefined) 
                return res.json({ code: 400, msg: "Username not available!" });


        } catch (err: any) {
            return res.json({
                code: 500,
                msg: "Some error occurred while retrieving Player by PID",
            });
        }
    }
};

export default authController;