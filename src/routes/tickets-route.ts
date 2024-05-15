import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";
import { Ticket } from '../model/ticket';

export class CS571TicketsRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/tickets';

    private readonly tix: Ticket[];

    public constructor(tix: Ticket[]) {
        this.tix = tix;
    }

    public addRoute(app: Express): void {
        app.get(CS571TicketsRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.tix);
        })
    }

    public getRouteName(): string {
        return CS571TicketsRoute.ROUTE_NAME;
    }
}