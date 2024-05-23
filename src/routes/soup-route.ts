import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571SoupRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/soup';

    private readonly soup: any;

    public constructor(soup: any) {
        this.soup = soup;
    }

    public addRoute(app: Express): void {
        app.get(CS571SoupRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.soup);
        })
    }

    public getRouteName(): string {
        return CS571SoupRoute.ROUTE_NAME;
    }
}