import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework/src/interfaces/route";
import { CS571Config } from '@cs571/su24-api-framework';
import CS571IcePublicConfig from '../config/public-config';
import CS571IceSecretConfig from '../config/secret-config';

export class CS571LogoutRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/logout';

    private readonly config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>

    public constructor(config: CS571Config<CS571IcePublicConfig, CS571IceSecretConfig>) {
        this.config = config;
    }

    public addRoute(app: Express): void {
        app.post(CS571LogoutRoute.ROUTE_NAME, (req, res) => {
            res.status(200).cookie(
                'icewebdev4_auth',
                "goodbye",
                {
                    domain: this.config.PUBLIC_CONFIG.IS_REMOTELY_HOSTED ? this.config.PUBLIC_CONFIG.COOKIE_DOMAIN : undefined,
                    sameSite: this.config.PUBLIC_CONFIG.IS_REMOTELY_HOSTED ? "none" : "lax",
                    secure: this.config.PUBLIC_CONFIG.IS_REMOTELY_HOSTED,
                    maxAge: 1,
                    partitioned: true,
                    httpOnly: true
                }
            ).send({
                msg: "You have been logged out! Goodbye."
            });
        })
    }

    public getRouteName(): string {
        return CS571LogoutRoute.ROUTE_NAME;
    }
}
