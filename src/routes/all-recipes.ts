import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework";

export class CS571AllRecipesRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/all-recipes';

    private readonly allRecipes: any[];

    public constructor(allRecipes: any[]) {
        this.allRecipes = allRecipes;
    }

    public addRoute(app: Express): void {
        app.get(CS571AllRecipesRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=60').send(this.allRecipes);
        })
    }

    public getRouteName(): string {
        return CS571AllRecipesRoute.ROUTE_NAME;
    }
}