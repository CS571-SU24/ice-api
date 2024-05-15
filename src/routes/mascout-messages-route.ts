import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571MascotMessagesRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/mascot-messages';

    private readonly msgs: string[];

    public constructor(msgs: string[]) {
        this.msgs = msgs;
    }

    public addRoute(app: Express): void {
        app.get(CS571MascotMessagesRoute.ROUTE_NAME, (req, res) => {
            res.status(200).send({
                msg: this.msgs[Math.floor(Math.random() * this.msgs.length)]
            });
        })
    }

    public getRouteName(): string {
        return CS571MascotMessagesRoute.ROUTE_NAME;
    }
}