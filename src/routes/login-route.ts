import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework/src/interfaces/route";
import { CS571Config } from '@cs571/su24-api-framework';
import { CS571IceDbConnector } from '../services/db-connector';
import { CS571IceTokenAgent } from '../services/token-agent';
import CS571IcePublicConfig from '../config/public-config';
import CS571IceSecretConfig from '../config/secret-config';
import { CS571UserService } from '../services/user-service';

export class CS571LoginRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/login';

    private readonly userService: CS571UserService;
    private readonly tokenAgent: CS571IceTokenAgent;
    private readonly config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>

    public constructor(userService: CS571UserService, tokenAgent: CS571IceTokenAgent, config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>) {
        this.userService = userService;
        this.tokenAgent = tokenAgent;
        this.config = config;
    }

    public addRoute(app: Express): void {
        app.post(CS571LoginRoute.ROUTE_NAME, (req, res) => {
            const username = req.body.username?.trim();
            const password = req.body.password?.trim();

            if (!username || !password) {
                res.status(400).send({
                    msg:  "A request must contain a 'username' and 'password'"
                });
                return;
            }

            if (!this.userService.isValid(username, password)) {
                res.status(401).send({
                    msg: "That username or password is incorrect!",
                })
                return;
            }

            const cook = this.tokenAgent.generateAccessToken(username);

            res.status(200).cookie(
                'icewebdev4_auth',
                cook,
                {
                    domain: this.config.PUBLIC_CONFIG.IS_REMOTELY_HOSTED ? this.config.PUBLIC_CONFIG.COOKIE_DOMAIN : undefined,
                    sameSite: this.config.PUBLIC_CONFIG.IS_REMOTELY_HOSTED ? "none" : "lax",
                    secure: this.config.PUBLIC_CONFIG.IS_REMOTELY_HOSTED,
                    maxAge: 3600000,
                    partitioned: true,
                    httpOnly: true,
                }
            ).send({
                msg: "Successfully authenticated.",
                username: username,
                eat: this.tokenAgent.getExpFromToken(cook)
            })
        })
    }


    public getRouteName(): string {
        return CS571LoginRoute.ROUTE_NAME;
    }
}
