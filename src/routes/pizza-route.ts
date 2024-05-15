import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571PizzaRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/pizza';

    private readonly pizza: any;

    public constructor(pizza: any) {
        this.pizza = pizza;
    }

    public addRoute(app: Express): void {
        app.get(CS571PizzaRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.pizza);
        })
    }

    public getRouteName(): string {
        return CS571PizzaRoute.ROUTE_NAME;
    }
}