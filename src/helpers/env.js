import { config } from "dotenv";
import argsv from "./arguments.helper.js";

const { mode } = argsv;

const path = ".env." + mode;
config({ path });

const env = {
    DB_LINK: process.env.DB_LINK,
    cookieSecret: process.env.cookieSecret,
    sessionSecret: process.env.sessionSecret,
    jwtSecret: process.env.jwtSecret,
    githubClientID: process.env.githubClientID,
    githubClientSecret: process.env.githubClientSecret,
    SALT: process.env.SALT,
    PORT: process.env.PORT
};

export default env;
