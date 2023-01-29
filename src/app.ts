import express from "express"
import logger from "./utils/logger";
import { dbConnection } from "./database";
import { ConnectOptions, connect,set } from "mongoose";
import IRoute from "./interface/route.interface";
import cors from "cors";

class App {
    private app: express.Application;
    private port: number;
    constructor(routes: IRoute[]) {
        this.app = express();
        this.port = 8084;
        this.initializeMiddleware()
        this.databaseConnection(); 
        this.initializeRoutes(routes)
    }
    listen() {
        this.app.listen(this.port, () => {
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
            logger.info(`▼                                   ▼`)
            logger.info(`▼ 🚀 🅻🅸🆂🆃🅴🅽🅸🅽🅶 🅾🅽 🅿🅾🆁🆃 ${this.port}         ▼`)
            logger.info(`▼                                   ▼`)
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
        })
    }

    private async databaseConnection() {
        try {
            set('strictQuery', false)
            await connect(dbConnection.uri as string, dbConnection.options as ConnectOptions)
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
            logger.info(`▼                                   ▼`)
            logger.info(`▼ 🛢  🅳🅰🆃🅰🅱🅰🆂🅴 🅲🅾🅽🅽🅴🅲🆃🅴🅳             ▼`)
            logger.info(`▼                                   ▼`)
            logger.info("▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎")
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message)
        }
    }

    private initializeMiddleware() {
        this.app.use(cors({origin: '*', credentials: true}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: IRoute[]) {
        routes.forEach(route => this.app.use("/api/v1", route.route))
    }
}

export default App

