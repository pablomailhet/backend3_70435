import "./helpers/env.js"
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import compression from "express-compression";

import { serve, setup } from "swagger-ui-express";
import swaggerSpecs from "./helpers/swagger.helper.js";

import { connectDB, sessionStore } from "./helpers/db.helper.js";
import indexRouter from "./routes/index.router.js";
import winston from "./middlewares/winston.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import pathHandler from "./middlewares/pathHandler.middleware.js";
import argvs from "./helpers/arguments.helper.js";
import logger from "./helpers/logger.helper.js";

import passport from 'passport';
import initializatePassword from './middlewares/passport.middleware.js';

const PORT = process.env.PORT || 9000;

const cookieSecret = process.env.cookieSecret;
const sessionSecret = process.env.sessionSecret;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression({ brotli: { enabled: true, zlib: {} } }));
app.use(cookieParser(cookieSecret));
app.use(winston);

app.use(
    session({
        store: sessionStore,
        secret: sessionSecret,
        resave: true,
        saveUninitialized: true,
    })
);

connectDB();

app.use(initializatePassword);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use("/api/docs", serve, setup(swaggerSpecs));

app.use("/", indexRouter);
app.use(errorHandler);
app.use(pathHandler);

const ready = async () => {
    logger.INFO(`server ready on port ${PORT} and mode ${argvs.mode}`);
    logger.INFO(`server ready on pid ${process.pid}`);
};

const httpServer = app.listen(PORT, ready);
