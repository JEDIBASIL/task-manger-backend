import express from "express"
import logger from "./utils/logger";
class App {
    private app: express.Application;
    private port: number;
    constructor() {
        this.app = express();
        this.port = 8084;
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
}

export default App