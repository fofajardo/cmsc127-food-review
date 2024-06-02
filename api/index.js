/*
 * Base imports.
 */
import "dotenv/config";
import { getPool } from "./db.js";
import express from "express";

/*
 * Session handling.
 */
import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";

/*
 * Routers.
 */
import routes from "./routes/_routes.js";

/*
 * Database.
 */
const gPool = getPool();
const gServer = express();
const SessionMySQLStore = MySQLStore(session);

// Use appropriate parsers to access the request/response body directly.
gServer.use(express.json());
gServer.use(express.urlencoded({ extended: false }));

// Set up session handling to use MongoDB.
gServer.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "00efdd87-1470-461c-adf5-bdd70cf75d9c",
    store: new SessionMySQLStore({}, gPool),
}));

// Set up Passport.js authentication.
gServer.use(passport.authenticate("session"));

// Set up the router, which handles the endpoints.
routes.useFor(gServer);

gServer.listen(process.env.API_SERVER_PORT, function() {
    console.log(`Listening to port: ${process.env.API_SERVER_PORT}`);
});
