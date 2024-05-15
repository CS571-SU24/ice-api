import { Express } from 'express';

import { CS571Route, CS571User } from "@cs571/su24-api-framework";
import { Ticket } from '../model/ticket';
import { CS571IceDbConnector } from '../services/db-connector';
import { CS571Auth } from '@cs571/su24-api-framework/dist/services/auth';
import { CS571UserService } from '../services/user-service';
import { CS571IceTokenAgent } from '../services/token-agent';

export class CS571CreateCommentRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/ice/comments';

    private readonly connector: CS571IceDbConnector;
    private readonly tokenAgent: CS571IceTokenAgent;
    private readonly auth: CS571Auth;

    public constructor(connector: CS571IceDbConnector, tokenAgent: CS571IceTokenAgent, auth: CS571Auth) {
        this.connector = connector;
        this.tokenAgent = tokenAgent;
        this.auth = auth;
    }

    public addRoute(app: Express): void {

        app.post(CS571CreateCommentRoute.ROUTE_NAME, this.tokenAgent.authenticateToken, async (req, res) => {
            const comment = req.body.comment?.trim();

            if (!comment) {
                res.status(400).send({
                    msg: "A request must contain a 'comment'"
                });
                return;
            }

            if (comment.length > 512) {
                res.status(413).send({
                    msg: "'comment' must be 512 characters or fewer"
                })
                return;
            }

            const bid = this.auth.getUserFromRequest(req).bid;
            const resultingComm = await this.connector.createComment(comment, (req as any).user.username, bid);
            res.status(200).send(resultingComm);
        })
    }

    public getRouteName(): string {
        return CS571CreateCommentRoute.ROUTE_NAME;
    }
}