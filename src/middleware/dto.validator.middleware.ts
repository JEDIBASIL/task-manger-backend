import Ajv from "ajv";
import { RequestHandler } from "express";
import logger from "../utils/logger";
import HttpException from "../error/HttpException";
import ajvKeywords from "ajv-keywords"

const dtoValidationMiddleware = (
    schema: any,
    value: "body" | "query" | "params" = "body",
): RequestHandler => {
    return (req, res, next) => {
        const ajv = new Ajv({ allErrors: true });
        ajvKeywords(ajv);
        const valid = ajv.validate(schema, req[value]);
        if (!valid) {
            logger.error(ajv.errors)
            next(new HttpException(400, "message"))
        }
        next()
    }
}


export { dtoValidationMiddleware }