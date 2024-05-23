import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571BreadsticksRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/breadsticks';

    private readonly breadsticks: any;

    public constructor(breadsticks: any) {
        this.breadsticks = breadsticks;
    }

    public addRoute(app: Express): void {
        app.get(CS571BreadsticksRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.breadsticks);
        })
    }

    public getRouteName(): string {
        return CS571BreadsticksRoute.ROUTE_NAME;
    }
}