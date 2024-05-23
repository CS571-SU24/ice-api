import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571SaladRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/salad';

    private readonly salad: any;

    public constructor(salad: any) {
        this.salad = salad;
    }

    public addRoute(app: Express): void {
        app.get(CS571SaladRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.salad);
        })
    }

    public getRouteName(): string {
        return CS571SaladRoute.ROUTE_NAME;
    }
}