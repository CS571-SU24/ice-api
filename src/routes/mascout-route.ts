import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571MascotRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/mascot';

    private readonly mascot: any;

    public constructor(mascot: any) {
        this.mascot = mascot;
    }

    public addRoute(app: Express): void {
        app.get(CS571MascotRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.mascot);
        })
    }

    public getRouteName(): string {
        return CS571MascotRoute.ROUTE_NAME;
    }
}