import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571HurricanesRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/hurricanes';

    private readonly hurr: any;

    public constructor(hurr: any) {
        this.hurr = hurr;
    }

    public addRoute(app: Express): void {
        app.get(CS571HurricanesRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.hurr);
        })
    }

    public getRouteName(): string {
        return CS571HurricanesRoute.ROUTE_NAME;
    }
}