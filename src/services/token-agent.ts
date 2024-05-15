import { CS571Config } from "@cs571/su24-api-framework";

import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import CS571IcePublicConfig from "../config/public-config";
import CS571IceSecretConfig from "../config/secret-config";


export class CS571IceTokenAgent {

    public static readonly DEFAULT_EXP: number = 60 * 60;

    private readonly config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>;

    public constructor(config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>) {
        this.config = config;
    }

    public authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = await this.validateToken(req.cookies['icewebdev4_auth'])
        if (token) {
            (req as any).user = token;
            next();
        } else {
            res.status(401).send({
                msg: "You must be logged in to do that!"
            });
        }
    }

    public validateToken = async<T = any>(token: string): Promise<T | undefined> => {
        return new Promise((resolve: any) => {
            if (!token) {
                resolve(undefined)
            }
            jwt.verify(token, this.config.SECRET_CONFIG.JWT_SECRET, (err: any, body: any): void => {
                if (err) {
                    resolve(undefined)
                } else {
                    resolve(body as T)
                }
            })
        });
    }

    public generateAccessToken = (username: string, exp?: number): string => {
        return this.generateToken({ username }, exp ?? CS571IceTokenAgent.DEFAULT_EXP);
    }

    public generateToken = (tokenBody: any, exp: number) => {
        return jwt.sign(tokenBody, this.config.SECRET_CONFIG.JWT_SECRET, { expiresIn: `${exp}s` });
    }

    public getExpFromToken = (token: string) => {
        return JSON.parse(atob(token.split(".")[1])).exp;
    }
}