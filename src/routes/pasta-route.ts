import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571PastaRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/pasta';

    private readonly pasta: any;

    public constructor(pasta: any) {
        this.pasta = pasta;
    }

    public addRoute(app: Express): void {
        app.get(CS571PastaRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.pasta);
        })
    }

    public getRouteName(): string {
        return CS571PastaRoute.ROUTE_NAME;
    }
}