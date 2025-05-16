import { connect } from "mongoose";
import MongoStore from 'connect-mongo';
import logger from "./logger.helper.js";

const DB_LINK = process.env.DB_LINK;

const connectDB = async () => {
    try {
        await connect(DB_LINK);
        logger.INFO("connected to mongo database")
    } catch (error) {
        logger.ERROR(error.message);
    }
};

const sessionStore = MongoStore.create({
    mongoUrl: DB_LINK,
    ttl: 60,
});

export { connectDB, sessionStore };
