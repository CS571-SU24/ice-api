import fs from 'fs'
import crypto from 'crypto'

import express, { Express } from 'express';
import cookies from "cookie-parser";

import { CS571Initializer } from '@cs571/su24-api-framework'
import { CS571ChiliRoute } from './routes/chili-route';
import { CS571PizzaRoute } from './routes/pizza-route';
import { CS571PastaRoute } from './routes/pasta-route';
import { CS571HurricanesRoute } from './routes/hurricanes-route';
import { CS571TicketsRoute } from './routes/tickets-route';
import { Ticket } from './model/ticket';
import CS571IcePublicConfig from './config/public-config';
import CS571IceSecretConfig from './config/secret-config';
import { CS571UserService } from './services/user-service';
import { CS571GetCommentsRoute } from './routes/get-comments-route';
import { CS571IceDbConnector } from './services/db-connector';
import { CS571IceTokenAgent } from './services/token-agent';
import { CS571CreateCommentRoute } from './routes/create-comment-route';
import { CS571LoginRoute } from './routes/login-route';
import { CS571LogoutRoute } from './routes/logout-route';
import { CS571MascotRoute } from './routes/mascout-route';
import { CS571MascotMessagesRoute } from './routes/mascout-messages-route';
import { CS571WhoAmIRoute } from './routes/whoami-route';
import { CS571SoupRoute } from './routes/soup-route';
import { CS571SaladRoute } from './routes/salad-route';
import { CS571BreadsticksRoute } from './routes/breadsticks-route';

console.log("Welcome to ICE API!");

const app: Express = express();
app.use(cookies());

// https://github.com/expressjs/express/issues/5275
declare module "express-serve-static-core" {
  export interface CookieOptions {
    partitioned?: boolean;
  }
}


const appBundle = CS571Initializer.init<CS571IcePublicConfig, CS571IceSecretConfig>(app, {
  allowNoAuth: [],
  skipAuth: false
});

const users = JSON.parse(fs.readFileSync(appBundle.config.PUBLIC_CONFIG.PASSWORDS_LOC).toString()).reduce((acc: any, user: any) => {
  acc[user.username] = user.password;
  return acc;
}, {})

const db = new CS571IceDbConnector(appBundle.config);
const ta = new CS571IceTokenAgent(appBundle.config);
const userService = new CS571UserService(users);

db.init();

const chili = JSON.parse(fs.readFileSync('includes/chili.json').toString())
const pasta = JSON.parse(fs.readFileSync('includes/pasta.json').toString())
const pizza = JSON.parse(fs.readFileSync('includes/pizza.json').toString())
const soup = JSON.parse(fs.readFileSync('includes/soup.json').toString())
const salad = JSON.parse(fs.readFileSync('includes/salad.json').toString())
const breadsticks = JSON.parse(fs.readFileSync('includes/breadsticks.json').toString())
const hurr = JSON.parse(fs.readFileSync('includes/hurr.json').toString()).map((h: any) => {
  return {
    ...h,
    start_date: h.start_date + Math.floor(Math.random()* 500000),
    end_date: h.end_date + Math.floor(Math.random()* 500000) ,
    id: crypto.createHash('sha256').update(h.name + String(h.start_date) + String(h.end_date) + String(h.category) + String(h.wind_speed)).digest('hex').substring(0, 28)
  }
})

const tix = JSON.parse(fs.readFileSync('includes/tickets.json').toString()).map((t: any) => new Ticket(
  t.name,
  t.description,
  t.author,
  t.daysOld,
  t.priority
));

const mascot = JSON.parse(fs.readFileSync('includes/mascot.json').toString())
const mascotMsgs = JSON.parse(fs.readFileSync('includes/mascot-messages.json').toString())

appBundle.router.addRoutes([
  new CS571ChiliRoute(chili),
  new CS571PastaRoute(pasta),
  new CS571PizzaRoute(pizza),
  new CS571SoupRoute(soup),
  new CS571SaladRoute(salad),
  new CS571BreadsticksRoute(breadsticks),
  new CS571HurricanesRoute(hurr),
  new CS571TicketsRoute(tix),
  new CS571GetCommentsRoute(db),
  new CS571CreateCommentRoute(db, ta, appBundle.auth),
  new CS571LoginRoute(userService, ta, appBundle.config),
  new CS571LogoutRoute(appBundle.config),
  new CS571WhoAmIRoute(ta),
  new CS571MascotRoute(mascot),
  new CS571MascotMessagesRoute(mascotMsgs)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
