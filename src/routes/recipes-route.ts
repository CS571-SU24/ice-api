import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571RecipesRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/recipes';

    public constructor() { }

    public addRoute(app: Express): void {
        app.get(CS571RecipesRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send([
                "https://cs571api.cs.wisc.edu/rest/su24/ice/chili",
                "https://cs571api.cs.wisc.edu/rest/su24/ice/pizza",
                "https://cs571api.cs.wisc.edu/rest/su24/ice/pasta",
                "https://cs571api.cs.wisc.edu/rest/su24/ice/soup",
                "https://cs571api.cs.wisc.edu/rest/su24/ice/salad",
                "https://cs571api.cs.wisc.edu/rest/su24/ice/breadsticks"
            ]);
        })
    }

    public getRouteName(): string {
        return CS571RecipesRoute.ROUTE_NAME;
    }
}