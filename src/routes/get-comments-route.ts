import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";
import { Ticket } from '../model/ticket';
import { CS571IceDbConnector } from '../services/db-connector';

export class CS571GetCommentsRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/comments';

    private readonly connector: CS571IceDbConnector;

    public constructor(connector: CS571IceDbConnector) {
        this.connector = connector;
    }

    public addRoute(app: Express): void {
        app.get(CS571GetCommentsRoute.ROUTE_NAME, async (req, res) => {
            const comms = await this.connector.getComments();
            res.status(200).send(comms)
        })
    }

    public getRouteName(): string {
        return CS571GetCommentsRoute.ROUTE_NAME;
    }
}